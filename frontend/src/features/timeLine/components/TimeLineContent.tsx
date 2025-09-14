import Avatar from '@/components/ui/Avatar'
import Tab, { TabItem } from '@/components/ui/Tab'
import TimeLineQuestionCard from '@/features/questions/components/TimeLineQuestionCard'
import TimeLinePostCardList from '@/features/timeLine/components/TimeLinePostCardList'
import type { Post } from '@/features/timeLine/types/Post'
import type { Question } from '@/features/timeLine/types/Question'
import { FiPlus } from 'react-icons/fi'

type TimeLineContentProps = {
  posts: Post[]
  completedPosts: Post[]
  questionList: Question[]
  onClick: () => void
  onSubmit: (value: { text: string }, post: Post) => void
}

export default function TimeLineContent(props: TimeLineContentProps) {
  function handleClick() {
    props.onClick()
  }

  function handleSubmit(value: { text: string }, post: Post) {
    props.onSubmit(value, post)
  }

  return (
    <div>
      <div className='flex items-center justify-between p-5'>
        <h2 className='text-xl font-bold'>タイムライン</h2>
        <Avatar
          className='bg-gradient-to-r from-sub-color to-main-color text-white'
          size='sm'
          onClick={handleClick}
        >
          <FiPlus />
        </Avatar>
      </div>

      <div>
        <Tab defaultActiveKey='1'>
          <TabItem label='全ての投稿' tabKey='1'>
            <TimeLinePostCardList posts={props.posts} onSubmit={handleSubmit} />
          </TabItem>
          <TabItem label='質問' tabKey='2'>
            <TimeLineQuestionCard questions={props.questionList} />
          </TabItem>
          <TabItem label='完了済み' tabKey='3'>
            <TimeLinePostCardList posts={props.completedPosts} onSubmit={handleSubmit} />
          </TabItem>
        </Tab>
      </div>
    </div>
  )
}
