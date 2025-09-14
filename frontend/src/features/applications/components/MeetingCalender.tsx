import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Button from '@/components/ui/Button'
import { IoClose } from 'react-icons/io5'

import useFetchApplicationMeetingAvailableSlots from '@/features/applications/hooks/useFetchApplicationMeetingAvailableSlots'
import type {
  ApplicationMeetingAvailableSlots,
  DateTimeSlot,
} from '@/features/applications/types/ApplicationMeetingAvailableSlot'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'

type DateListProps = {
  className?: string
  name: string
  control: Control<FieldValues>
  rules?: RegisterOptions
  onChangeDate?: (availableSlot: DateTimeSlot) => void
}

// このコンポーネントはユーザのみが使用することを想定
export default function MeetingCalender({
  control,
  name,
  className,
  rules,
  onChangeDate,
}: DateListProps) {
  const [isTouched, setIsTouched] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(true)

  const {
    field,
    formState: { errors },
  } = useController({ name, defaultValue: '', control, rules })

  const dateTools = useDateTools()
  const userWorkspaceId = useUserStore((state) => state.user?.activeWorkspace)?.workspaceId

  const startDate = dayjs().add(2, 'day').format('YYYY-MM-DD')
  const endDate = dayjs(startDate).add(6, 'day').format('YYYY-MM-DD')
  const { data, isLoading } = useFetchApplicationMeetingAvailableSlots(userWorkspaceId ?? '', {
    startDate,
    endDate,
  })
  const availableSlots = data

  const handleClickCell = (availableSlot: DateTimeSlot) => {
    if (!availableSlot.isAvailable) return

    field.onChange(availableSlot)
    setIsCalendarOpen(false)
    !isTouched && setIsTouched(true)
    onChangeDate && onChangeDate(availableSlot)
  }

  const handleClickBack = () => {
    field.onChange('')
    setIsCalendarOpen(true)
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  const DateLabel = () => {
    return (
      <div className='flex items-center py-1 leading-4 lg:h-12'>
        <div className='grid h-10 w-full grid-cols-8 items-center gap-1'>
          <div></div>
          {(availableSlots?.dates ?? []).map((date) => (
            <div key={date} className='m-auto flex flex-col items-center lg:flex-row'>
              <div className='flex flex-col items-center justify-center lg:flex-row'>
                {dateTools.formatDate(date, 'MM/DD')}
              </div>
              <div
                className={cn(
                  'lg:ml-1',
                  dateTools.isSaturday(new Date(date)) && 'text-main-color',
                  dateTools.isSunday(new Date(date)) && 'text-warn-red',
                )}
              >
                {dateTools.formatDate(date, '(ddd)')}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const Cell = (props: { time: DateTimeSlot }) => {
    const { time } = props
    return (
      <div
        className={cn(
          'flex h-12 items-center justify-center rounded',
          time.isAvailable ? 'cursor-pointer border bg-white' : 'bg-bg-primary text-text-secondary',
        )}
        onClick={() => handleClickCell(time)}
      >
        {time.isAvailable ? (
          <p className='cursor-pointer bg-gradient-to-r from-sub-color to-main-color bg-clip-text text-3xl text-transparent'>
            ○
          </p>
        ) : (
          <IoClose className='size-5' />
        )}
      </div>
    )
  }

  const Calendar = () => {
    return (
      <div className='text-sm lg:text-md'>
        <DateLabel />
        <div className='flex h-96 w-full flex-col gap-1 overflow-y-scroll'>
          {availableSlots &&
            Object.keys(availableSlots.times).map((keyOfTimes) => {
              const key = keyOfTimes as keyof ApplicationMeetingAvailableSlots['times']
              return (
                <div key={key} className='grid w-full grid-cols-8 items-center gap-1'>
                  <div className='m-auto flex items-center text-md lg:text-base'>{key}</div>
                  {availableSlots.times[key].map((availableSlot) => (
                    <Cell key={availableSlot.dateTime} time={availableSlot} />
                  ))}
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {isCalendarOpen ? (
        <Calendar />
      ) : (
        <div className='flex w-full flex-col items-start justify-between gap-5 rounded bg-bg-primary p-5 lg:h-20 lg:flex-row lg:items-center'>
          <p>選択した日付</p>
          <p className='text-xl font-bold'>
            {field.value &&
              dateTools.formatDate(new Date(field.value.dateTime), 'YYYY年MM月DD日(ddd) HH:mm〜')}
          </p>
          <Button
            intent='secondary'
            size='sm'
            className='h-12 w-full text-md lg:w-auto'
            onClick={handleClickBack}
          >
            戻る
          </Button>
        </div>
      )}

      {isTouched && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([name, message]) => (
              <p key={name} className='p-1 text-sm text-warn-red'>
                {message}
              </p>
            ))
          }
        />
      )}
    </div>
  )
}
