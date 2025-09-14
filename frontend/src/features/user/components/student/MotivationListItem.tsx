import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import Stars from '@/features/user/components/student/Stars'
import useDateTools from '@/hooks/useDateTools'
import { BsChatDots } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

export type MotivationData = {
  id: number
  studentName: string
  avatar?: string
  rating: number
  lastLogin: string
}

type MotivationListItemProps = {
  motivationData: MotivationData
  onClick?: () => void
}

export default function MotivationListItem(props: MotivationListItemProps) {
  const { motivationData } = props

  const { getElapsedTime } = useDateTools()

  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <>
      <div className='relative flex h-16 w-full items-center justify-between rounded bg-bg-primary p-5 text-md'>
        <div className='flex items-center gap-1'>
          <Avatar className='bg-white' size='xs'>
            {motivationData.avatar ? (
              <Image src={motivationData.avatar} alt='Avatar' fill />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-white' />
            )}
          </Avatar>
          <p>{motivationData.studentName}</p>
        </div>
        <Stars rating={motivationData.rating} />
        <div className='flex w-fit items-center gap-2.5 text-sm'>
          <p>最終ログイン</p>
          <p className=''>{getElapsedTime(new Date(motivationData.lastLogin))}</p>
        </div>
        <div className='flex items-center gap-2.5'>
          <Button
            onClick={handleClick}
            size='sm'
            className='flex h-12 items-center justify-center gap-1 p-2.5'
          >
            <BsChatDots className='size-5' />
            <p>生徒に連絡</p>
          </Button>
          <div className='flex size-12 items-center justify-center'>
            <HiDotsVertical className='size-5 cursor-pointer' />
          </div>
        </div>
      </div>
    </>
  )
}
