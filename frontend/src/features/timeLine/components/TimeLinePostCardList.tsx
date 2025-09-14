import TimeLinePostCard from '@/features/timeLine/components/TimeLinePostCard'
import type { Post } from '@/features/timeLine/types/Post'
import dayjs from 'dayjs'

type TimeLinePostCardProps = {
  posts: Post[]
  onSubmit: (value: { text: string }, post: Post) => void
}

export default function TimeLinePostCardList(props: TimeLinePostCardProps) {
  function handleSubmit(value: { text: string }, post: Post) {
    props.onSubmit(value, post)
  }

  return (
    <>
      {props.posts
        // 日付が新しいものから表示
        .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
        .map((post, index) => (
          <TimeLinePostCard key={index} post={post} onSubmit={handleSubmit} />
        ))}
    </>
  )
}
