import useFetchFirstMeetingAvailableSlots from '@/features/meeting/hooks/useFetchFirstMeetingAvailableSlots'
import type { DateTimeSlots, TimeSlot } from '@/features/meeting/types/FirstMeetingAvailableSlots'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import dayjs from '@/lib/dayjs'
import { useUserStore } from '@/store/user-store'
import { useEffect, useState } from 'react'

type DateListProps = Readonly<{
  dates: string[]
  selectDate: string | null
  availableDateTimes: DateTimeSlots[]
  onSelect: (date: string) => void
}>

function DateList({ dates, selectDate, availableDateTimes, onSelect }: DateListProps) {
  const dateTools = useDateTools()

  const handleSelect = (date: string) => {
    onSelect(date)
  }

  const isSameDay = (date: string) => {
    if (selectDate === null) return false
    return dateTools.isSameDay(selectDate, date)
  }

  // 選択された日付に予約可能な枠があるかを確認
  const isAvailableDate = (day: string) => {
    const availableDate = availableDateTimes.filter((date) => date.date === day)
    return availableDate.every((date) => date.slots.length > 0)
  }

  return (
    <div className='flex gap-2 overflow-auto'>
      {dates.map((day, index) => (
        <button
          key={index}
          className={cn(
            'bg-bg-secondary hover:bg-bg-hover-secondary',
            'flex w-28 rounded p-3 text-center text-lg font-bold',
            isSameDay(day) && 'bg-gradient-to-r from-teal-400 to-blue-500 text-white',
            !isAvailableDate(day) && 'opacity-20',
          )}
          onClick={() => handleSelect(day)}
          disabled={!isAvailableDate(day)}
        >
          {dateTools.formatDate(day, 'MM/DD')}
          <p
            className={cn(
              dateTools.isSaturday(day) && 'text-blue-600',
              dateTools.isSunday(day) && 'text-red-600',
              isSameDay(day) && 'text-white',
            )}
          >
            {`(${dateTools.getDayOfWeekJP(day)})`}
          </p>
        </button>
      ))}
    </div>
  )
}

type TimeListProps = Readonly<{
  selectDate: string
  selectTime: TimeSlot | null
  timeSlots: TimeSlot[]
  onSelect: (date: string, slot: TimeSlot) => void
}>

function TimeList({ selectDate, selectTime, timeSlots, onSelect }: TimeListProps) {
  const handleSelect = (time: TimeSlot) => {
    onSelect(selectDate, time)
  }

  const isSameDateTime = (time: TimeSlot) => {
    if (selectTime === null) return false
    return selectTime.time === time.time
  }

  return (
    <div className='flex flex-col gap-2 lg:flex-row'>
      {timeSlots.map((timeSlot, index) => {
        return (
          <button
            key={index}
            className={cn(
              'w-full rounded px-6 py-3 lg:w-28',
              'text-center text-lg font-bold',
              'bg-bg-secondary from-teal-400 to-blue-500 hover:bg-bg-hover-secondary',
              isSameDateTime(timeSlot) && 'bg-gradient-to-r from-teal-400 to-blue-500 text-white',
            )}
            onClick={() => handleSelect(timeSlot)}
          >
            {timeSlot.time}〜
          </button>
        )
      })}
    </div>
  )
}

type SelectDateTimeProps = {
  userId: string
  onChangeDate: (date: string) => void
  onChangeTime: (date: string, slot: TimeSlot) => void
}

export default function SelectDateTime({
  userId,
  onChangeDate,
  onChangeTime,
}: SelectDateTimeProps) {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const [selectDate, setSelectDate] = useState<string | null>(null)
  const [selectTime, setSelectTime] = useState<TimeSlot | null>(null)
  const [meetingDateTimes, setMeetingDateTimes] = useState<DateTimeSlots[]>([])
  const [displayDates, setDisplayDates] = useState<string[]>([])
  const [displayTimes, setDisplayTimes] = useState<TimeSlot[]>([])

  const { data, isLoading } = useFetchFirstMeetingAvailableSlots(workspaceId, {
    userId,
    startDate: dayjs.tz().add(2, 'day').format('YYYY-MM-DD'),
    endDate: dayjs.tz().add(8, 'day').format('YYYY-MM-DD'),
  })

  useEffect(() => {
    setDisplayDates(data?.meta?.dates ?? [])
    setMeetingDateTimes(data?.data ?? [])
  }, [data])

  useEffect(() => {
    const selectedMeetingDate = meetingDateTimes.find((meeting) => meeting.date === selectDate)

    // 選択された日付に対応する時間を取得
    setDisplayTimes(selectedMeetingDate?.slots ?? [])
  }, [meetingDateTimes, selectDate])

  const handleSelectDate = (date: string) => {
    setSelectDate(date)
    setSelectTime(null)
    onChangeDate(date)
  }

  const handleSelectTime = (date: string, slot: TimeSlot) => {
    setSelectTime(slot)
    onChangeTime(date, slot)
  }

  return (
    <>
      <div className='flex h-full flex-col lg:gap-8'>
        <div>
          {isLoading ? (
            <>
              <p>面談予約可能日を取得中</p>
              <p>※データの取得に時間がかかる場合があります。</p>
            </>
          ) : (
            <>
              <p className='mb-5 text-sm font-medium'>面接可能な日付を選択してください。</p>
              <div className='mb-5'>
                <DateList
                  dates={displayDates}
                  onSelect={handleSelectDate}
                  selectDate={selectDate}
                  availableDateTimes={meetingDateTimes}
                />
              </div>
            </>
          )}
        </div>

        {selectDate && (
          <div className='flex grow flex-col gap-5 overflow-y-auto'>
            <p className='text-sm font-medium'>
              面接可能な時間を選択してください。面談の所要時間は1時間です。
            </p>

            <div className='grow overflow-y-auto'>
              <TimeList
                selectDate={selectDate}
                selectTime={selectTime}
                timeSlots={displayTimes}
                onSelect={handleSelectTime}
              />
              {displayTimes.length === 0 && (
                <p className='text-sm text-red-600'>選択した日付に面談可能な時間がございません。</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
