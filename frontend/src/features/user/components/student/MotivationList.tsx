import type { MotivationData } from '@/features/user/components/student/MotivationListItem'
import MotivationListItem from '@/features/user/components/student/MotivationListItem'

type MotivationListProps = {
  onClick?: () => void
  motivationDatas: MotivationData[]
}

export default function MotivationList(props: MotivationListProps) {
  const { motivationDatas } = props

  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <>
      <div className='flex size-full flex-col gap-2 overflow-y-auto'>
        {motivationDatas.map((motivationData) => (
          <MotivationListItem
            key={motivationData.id}
            motivationData={motivationData}
            onClick={handleClick}
          />
        ))}
      </div>
    </>
  )
}
