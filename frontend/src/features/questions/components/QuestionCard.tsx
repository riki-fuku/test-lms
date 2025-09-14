import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import { getBreakpointValue } from '@/constants/breakpoint'
import Label from '@/features/questions/components/Label'
import LabelCategory from '@/features/questions/components/LabelCategory'
import TagLabel from '@/features/questions/components/TagLabel'
import type { Question } from '@/features/questions/types/Question'
import { RESOLVED } from '@/features/questions/types/QuestionStatus'
import useWindowSize from '@/hooks/useWindowSize'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'

export type QuestionCardProps = {
  isUser: boolean
  workspaceId: string
  question: Question
}

export default function QuestionCard({ isUser, workspaceId, question }: QuestionCardProps) {
  const resolvedStyle =
    question.status === RESOLVED
      ? {
          label: '解決済',
          labelStyle: 'bg-warn-red text-white w-9 lg:w-16 p-1 lg:px-2 lg:py-1',
          textColor: 'text-warn',
        }
      : {
          label: '未解決',
          labelStyle: 'text-white w-9 lg:w-16 p-1 lg:px-2 lg:py-1',
          textColor: 'text-text-secondary',
        }

  const calculateTimeAgo = (createdAtString: string) => {
    const createdAtDate = new Date(createdAtString)
    const elapsedMs = new Date().getTime() - createdAtDate.getTime()
    const hoursAgo = Math.floor(elapsedMs / (1000 * 60 * 60))
    const daysAgo = Math.floor(hoursAgo / 24)
    const weeksAgo = Math.floor(daysAgo / 7)

    if (hoursAgo < 24) {
      return `${hoursAgo}時間前`
    } else if (daysAgo < 7) {
      return `${daysAgo}日前`
    } else {
      return `${weeksAgo}週間前`
    }
  }
  const { width } = useWindowSize()

  const tags = question.tags || []
  const displayedTags = width && width <= getBreakpointValue('md') ? tags.slice(0, 2) : tags

  return (
    <div className='flex gap-2.5 border-b border-border-primary px-2 py-5 lg:gap-5'>
      <div className='w-9 text-center lg:w-16'>
        <Label label={resolvedStyle.label} className={resolvedStyle.labelStyle} />
        <p className={`text-xl ${resolvedStyle.textColor}`}>{question.answers?.length || 0}</p>
        <p className={`text-xs ${resolvedStyle.textColor}`}>回答</p>
      </div>
      <div className='grow'>
        <Link href={`/renewal/${workspaceId}/questions/posts/${question.id}`} target='_blank'>
          <p className='mb-2 cursor-pointer text-md text-mainColor lg:text-base'>
            {question.title}
          </p>
        </Link>
        <div className='flex justify-between'>
          <div className='align-center flex items-center gap-2'>
            <LabelCategory id={question.category} />
            <div className='h-5 border-l border-weakGrey'></div>
            {displayedTags.map((tag) => (
              <TagLabel key={tag.id} label={tag.name} />
            ))}
          </div>
          <div className='flex items-center gap-2.5 lg:gap-5'>
            <div className='flex items-center gap-1'>
              <Avatar className='bg-white' size='xs'>
                {question.user.avatar ? (
                  <Image src={question.user.avatar} alt='Avatar' fill />
                ) : (
                  <FaUserCircle className='size-full fill-text-secondary text-text-secondary' />
                )}
              </Avatar>
              <p className='text-sm'>{question.user.nickname}</p>
            </div>
            <p className='text-xs lg:text-sm'>{calculateTimeAgo(question.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
