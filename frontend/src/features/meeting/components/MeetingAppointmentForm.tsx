import Button from '@/components/ui/Button'
import MeetingCalender from '@/features/meeting/components/MeetingCalendar'

import useDateTools from '@/hooks/useDateTools'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { Slot } from '@/features/meeting/types/MeetingAvailableSlots'

type MeetingAppointmentFormProps = {
  onConfirm: (availableSlot: Slot) => void
}

export default function MeetingAppointmentForm({ onConfirm }: MeetingAppointmentFormProps) {
  const [selectCell, setSelectCell] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const { control } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  })

  const dateTools = useDateTools()

  const handleReturn = () => {
    setSelectCell(false)
  }

  const handleConfirm = () => {
    if (!selectedSlot) return
    onConfirm(selectedSlot)
    setSelectCell(false)
  }

  const handleClickCalendarCell = (availableSlot: Slot) => {
    setSelectedSlot(availableSlot)
    setSelectCell(true)
  }

  return (
    <>
      <div className='flex w-full flex-col'>
        {selectCell ? (
          <div className='bg-bg-primary py-44'>
            <div className='flex flex-col items-center justify-center gap-10'>
              <p className='text-xl font-bold lg:text-3xl lg:font-normal'>
                以下の日程で面談を予約しますか？
              </p>
              <p className='font-bold lg:text-xl'>
                {selectedSlot &&
                  dateTools.formatDate(selectedSlot.dateTime, 'YYYY/MM/DD(ddd) HH:mm〜')}
              </p>
              <div className='m-auto flex gap-5'>
                <Button
                  intent='secondary'
                  className='w-full min-w-36 lg:min-w-44'
                  onClick={handleReturn}
                >
                  戻る
                </Button>
                <Button onClick={handleConfirm} className='min-w-36 lg:min-w-44'>
                  予約確定
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <MeetingCalender
            control={control}
            name='meetingDate'
            className='px-2'
            rules={{ required: '面談の日程を入力してください。' }}
            onChangeDate={handleClickCalendarCell}
          />
        )}
      </div>
    </>
  )
}
