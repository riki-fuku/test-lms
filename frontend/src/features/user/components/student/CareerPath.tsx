import CareerPathChart from '@/features/user/components/student/CareerPathChart'
import CareerPathList from '@/features/user/components/student/CareerPathList'
import type { Graduate } from '@/features/user/components/student/CareerPathListItem'

type CareerPathProps = {
  graduates: Graduate[]
}

export default function CareerPath(props: CareerPathProps) {
  const { graduates } = props
  return (
    <div className='flex items-center gap-5'>
      <div className='h-72 w-5/12'>
        <CareerPathChart graduates={graduates} />
      </div>
      <div className='relative flex h-72 flex-1'>
        <CareerPathList graduates={graduates} />
        <div className='pointer-events-none absolute z-10 size-full bg-gradient-to-b from-white/0 to-white/80'></div>
      </div>
    </div>
  )
}
