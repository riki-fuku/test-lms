import { ReserveSlotCalendar as KitReserveSlotCalendar } from '@/components/kit/forms/ReserveSlotCalendar'
import type { FormValues } from '@/features/suspendApplication/components/SuspendApplicationForm'
import type { Control } from 'react-hook-form'

type Props = {
  name: string
  control: Control<FormValues>
}

export function ReserveSlotCalendar({ name, control }: Props) {
  // TODO: 休学申請カレンダー情報取得

  const generateTimeSlots = () => {
    const slots: Record<string, Array<{ dateTime: string; isAvailable: boolean }>> = {}
    const startHour = 9
    const endHour = 22
    const days = 7

    // 30分刻みの時間を生成
    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of ['00', '30']) {
        const timeKey = `${hour.toString().padStart(2, '0')}:${minute}`
        slots[timeKey] = []

        // 7日分のデータを生成
        for (let day = 0; day < days; day++) {
          const date = new Date()
          date.setDate(date.getDate() + day)
          const dateStr = date.toISOString().split('T')[0]
          slots[timeKey].push({
            dateTime: `${dateStr} ${timeKey}`,
            isAvailable: Math.random() < 0.5,
          })
        }
      }
    }

    return slots
  }
  const { data: slotCalendar } = {
    data: {
      dates: [
        // 今日から7日間の日付を生成
        ...Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() + i)
          return date.toISOString().split('T')[0]
        }),
      ],
      times: generateTimeSlots(),
    },
  }

  return <KitReserveSlotCalendar name={name} control={control} slotCalendar={slotCalendar} />
}
