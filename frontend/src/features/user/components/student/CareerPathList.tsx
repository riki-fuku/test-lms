import type { Graduate } from '@/features/user/components/student/CareerPathListItem'
import CareerPathListItem from '@/features/user/components/student/CareerPathListItem'

type CareerPathListProps = {
  onClick?: () => void
  graduates: Graduate[]
}

export default function CareerPathList(props: CareerPathListProps) {
  const { graduates } = props

  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <>
      <div className='flex size-full flex-col gap-2 overflow-y-auto'>
        {graduates.map((guraduate, index) => (
          <CareerPathListItem key={index} graduate={guraduate} onClick={handleClick} />
        ))}
      </div>
    </>
  )
}
