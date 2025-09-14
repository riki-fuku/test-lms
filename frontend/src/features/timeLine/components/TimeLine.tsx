import Button from '@/components/ui/Button'
import TimeLineContent from '@/features/timeLine/components/TimeLineContent'
import TimeLinePostCardContent from '@/features/timeLine/components/TimeLinePostCardContent'
import useFetchPosts from '@/features/timeLine/hooks/useFetchPosts'
import useFetchQuestions from '@/features/timeLine/hooks/useFetchQuestions'
import type { Comment } from '@/features/timeLine/types/Comment'
import type { Post } from '@/features/timeLine/types/Post'
import type { Question } from '@/features/timeLine/types/Question'
import { COACH_USER, CS_USER } from '@/features/user/dummyData/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TimeLine() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [completedPosts, setCompletedPosts] = useState<Post[]>([])
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [displayContent, setDisplayContent] = useState<'timeLine' | 'postForm'>('timeLine')

  const { data: posts } = useFetchPosts()
  const { data: questions } = useFetchQuestions()

  useEffect(() => {
    if (posts) {
      setAllPosts(posts)
    }

    if (questions) {
      setQuestionList(questions)
    }
  }, [posts])

  useEffect(() => {
    setCompletedPosts(getCompletedPosts(allPosts))
  }, [allPosts])

  if (!posts || !questions) return

  function getCompletedPosts(posts: Post[]) {
    return posts.filter((post) => post.completed)
  }

  function changeDisplayContent(content: 'timeLine' | 'postForm') {
    setDisplayContent(content)
  }

  function commentCardFormSubmit(value: { text: string }, post: Post) {
    const newComment: Comment = {
      user: COACH_USER,
      date: new Date().toString(),
      message: value.text,
    }

    post.comments.push(newComment)

    setAllPosts([...allPosts, post])
  }

  function postCardFormSubmit(value: { text: string }) {
    const newPost: Post = {
      operation: CS_USER,
      date: new Date().toString(),
      content: value.text,
      completed: false,
      comments: [],
    }
    setAllPosts([...allPosts, newPost])
  }

  function DisplayContent() {
    switch (displayContent) {
      case 'timeLine':
        return (
          <TimeLineContent
            posts={allPosts}
            completedPosts={completedPosts}
            questionList={questionList}
            onClick={() => changeDisplayContent('postForm')}
            onSubmit={commentCardFormSubmit}
          />
        )
      case 'postForm':
        return (
          <TimeLinePostCardContent
            posts={allPosts}
            onClick={() => changeDisplayContent('timeLine')}
            onSubmit={postCardFormSubmit}
          />
        )
    }
  }

  return (
    <>
      <div className='flex flex-col gap-5 p-5'>
        <Link href='/choice-question/'>
          {/* デザインのフォントサイズは16pxですが、Buttonコンポーネントの都合上14pxに設定しました */}
          <Button className='w-full'>メッセージを送信</Button>
        </Link>
      </div>

      <DisplayContent />
    </>
  )
}
