import Button from '@/components/ui/Button'
import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import type { CoachData } from '@/features/meeting/types/CoachMeetingListTypes'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'

type PayrollProps = {
  coachData: CoachData
  className?: string
}

export default function Payroll(props: PayrollProps) {
  const [options, setOptions] = useState<Option[]>([])
  const [selectedMonth, setSelectedMonth] = useState<Option>()
  const { coachData } = props

  useEffect(() => {
    const options = coachData.payrolls.map((payroll) => {
      return {
        id: payroll.id,
        label: payroll.month + '月',
        value: payroll.month,
      }
    })
    setOptions(options)
  }, [])

  function handleChangeMonth(option: Option | null) {
    option !== null && setSelectedMonth(option)
  }

  const lineStyle = 'flex items-center justify-between border-b pb-1'

  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-5 rounded border bg-white px-4 py-6',
        props.className,
      )}
    >
      <div className='flex items-center justify-between'>
        <p className='font-bold'>給与明細</p>
        <div className='relative z-10'>
          <InputSelect className='w-24' options={options} onChange={handleChangeMonth} />
        </div>
      </div>

      <div className='flex flex-col gap-2.5 text-md'>
        <div className={cn(lineStyle)}>
          <p>面談回数</p>
          <p>
            {coachData.meetingCount}
            <span className='text-xs'>回</span>
          </p>
        </div>

        <div className={cn(lineStyle)}>
          <p>給与合計</p>
          <p>
            {coachData.totalAmount.toLocaleString()}
            <span className='text-xs'>円</span>
          </p>
        </div>

        <div className={cn(lineStyle)}>
          <p>コーチランク</p>
          <div className='flex items-center gap-2'>
            <div className='size-4 bg-form-gray'></div>
            <p>{coachData.rank}</p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <Button className='h-12 w-full' disabled>
          請求書を発行
        </Button>
      </div>
    </div>
  )
}
