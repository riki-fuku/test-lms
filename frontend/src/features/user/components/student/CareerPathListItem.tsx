import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import { BsChatDots } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

export type Graduate = {
  studentName: string
  avatar?: string
  tags: string[]
}

type CareerPathListItemProps = {
  graduate: Graduate
  onClick?: () => void
}

export default function CareerPathListItem(props: CareerPathListItemProps) {
  const { graduate } = props

  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  function StudentName(props: { avatar: string | undefined; name: string }) {
    return (
      <div className='flex flex-1 items-center gap-1'>
        <Avatar className='bg-white' size='xs'>
          {props.avatar ? (
            <Image src={props.avatar} alt='Avatar' fill />
          ) : (
            <FaUserCircle className='size-full fill-text-secondary text-white' />
          )}
        </Avatar>
        <div className='flex items-end gap-2.5'>
          <p className='text-md'>{props.name}</p>
        </div>
      </div>
    )
  }

  function Tag(props: { tag: string }) {
    return (
      <div className='pointer-events-none whitespace-nowrap rounded bg-bg-tertiary px-2 py-1 text-white'>
        {props.tag}
      </div>
    )
  }

  return (
    <>
      <div className='relative flex h-16 w-full items-center justify-between rounded bg-bg-primary p-5 text-md'>
        <div className='flex flex-1 items-center gap-1'>
          <StudentName avatar={graduate.avatar} name={graduate.studentName} />
        </div>
        <div className='flex w-72 items-center gap-2.5 '>
          {graduate.tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
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
        </div>
      </div>
    </>
  )
}
