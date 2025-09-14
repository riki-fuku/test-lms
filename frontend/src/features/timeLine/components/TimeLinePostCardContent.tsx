import TimeLinePostCardForm from '@/features/timeLine/components/TImeLinePostCardForm'
import TimeLinePostCardList from '@/features/timeLine/components/TimeLinePostCardList'
import type { Post } from '@/features/timeLine/types/Post'

type TimeLinePostCardContentProps = {
  posts: Post[]
  onClick: () => void
  onSubmit: (value: { text: string }) => void
}

export default function TimeLinePostCardContent(props: TimeLinePostCardContentProps) {
  function clickCancel() {
    props.onClick()
  }

  function handleSubmit(value: { text: string }) {
    props.onSubmit(value)
  }

  return (
    <div>
      <div className='flex items-center justify-between border-y px-4 py-5'>
        <h2 className='text-xl font-bold'>新規投稿</h2>
        <span className='cursor-pointer text-sm text-text-secondary' onClick={clickCancel}>
          キャンセル
        </span>
      </div>

      <TimeLinePostCardForm onSubmit={handleSubmit} />

      <div className='px-5'>
        <TimeLinePostCardList posts={props.posts} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
