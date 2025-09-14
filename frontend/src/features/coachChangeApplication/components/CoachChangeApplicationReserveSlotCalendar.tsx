'use client'

import type { SlotCalendarProps } from '@/components/kit'
import { Button, SlotCalendar } from '@/components/kit'
import { fetchInterviewSlots } from '@/features/applicationInterviewEmployee/api'
import { APPLICATION_TYPE } from '@/features/applications/constants'
import dayjs from '@/lib/dayjs'
import { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'

type Props = Omit<SlotCalendarProps, 'slotCalendar'> & {
  workspaceId: string
}

type SlotCalendarData = {
  dates: string[]
  times: Record<string, Array<{ dateTime: string; isAvailable: boolean; employeeId: string }>>
}

export function CoachChangeApplicationReserveSlotCalendar({
  control,
  workspaceId,
  ...props
}: Props) {
  const employeeId = useController({ name: 'employeeId', control })

  const [weekIndex, setWeekIndex] = useState(0) // 0: 今週, 1: 次週
  const [slotCalendars, setSlotCalendars] = useState<Record<number, SlotCalendarData>>({})
  const [isLoading, setIsLoading] = useState(true)

  const goToNextWeek = () => setWeekIndex(1)
  const goToThisWeek = () => setWeekIndex(0)

  // 初回に今週・次週分を一括取得してキャッシュ
  useEffect(() => {
    const fetchAllWeeks = async () => {
      setIsLoading(true)

      try {
        const today = dayjs()

        const baseDates = [0, 1].map((index) => {
          const baseOffsetDays = 2 + index * 7
          const start = today.add(baseOffsetDays, 'day')
          const end = start.add(6, 'day')
          return { weekIndex: index, start, end }
        })

        const responses = await Promise.all(
          baseDates.map(({ weekIndex, start, end }) =>
            fetchInterviewSlots({
              pathParams: { workspaceId },
              queryParams: {
                application_type: APPLICATION_TYPE.COACH_CHANGE_APPLICATION.toString(),
                start_date: start.format('YYYY-MM-DD'),
                end_date: end.format('YYYY-MM-DD'),
              },
            }).then((res) => ({ weekIndex, data: res.data })),
          ),
        )

        const calendarMap: Record<number, SlotCalendarData> = {}
        responses.forEach(({ weekIndex, data }) => {
          calendarMap[weekIndex] = data
        })

        setSlotCalendars(calendarMap)
      } catch (error) {
        console.error('面談カレンダー取得に失敗しました', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllWeeks()
  }, [workspaceId])

  const slotCalendar = slotCalendars[weekIndex]

  if (isLoading || !slotCalendar) {
    return <div>読み込み中...</div>
  }

  return (
    <div>
      <div className='mb-4 flex justify-between'>
        {weekIndex === 1 ? (
          <Button
            variant='light'
            onPress={goToThisWeek}
            className='text-blue-600 underline hover:text-blue-800'
          >
            前の週へ
          </Button>
        ) : (
          <span />
        )}
        {weekIndex === 0 ? (
          <Button
            variant='light'
            onPress={goToNextWeek}
            className='text-blue-600 underline hover:text-blue-800'
          >
            次の週へ
          </Button>
        ) : (
          <span />
        )}
      </div>

      <div className='border border-gray-200 px-2 py-1'>
        <SlotCalendar
          control={control}
          slotCalendar={slotCalendar}
          onChangeDate={(cellItem) => {
            if (cellItem) {
              employeeId.field.onChange(cellItem.employeeId)
            }
          }}
          {...props}
        />
      </div>
    </div>
  )
}
