import MotivationList from '@/features/user/components/student/MotivationList'
import type { MotivationData } from '@/features/user/components/student/MotivationListItem'

type MotivationProps = {
  motivationDatas: MotivationData[]
}

export default function Motivation(props: MotivationProps) {
  const { motivationDatas } = props
  return (
    <div className='flex items-center gap-5'>
      <div className='size-72'>{/* <DoughnutChart /> */}</div>
      <div className='relative flex h-72 flex-1'>
        <MotivationList motivationDatas={motivationDatas} />
        <div className='pointer-events-none absolute z-10 size-full bg-gradient-to-b from-white/0 to-white/80'></div>
      </div>
    </div>
  )
}
