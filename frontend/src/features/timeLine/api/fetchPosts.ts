import type { Post } from '@/features/timeLine/types/Post'
import { COACH_USER, CS_USER } from '@/features/user/dummyData/user'
import dayjs from 'dayjs'

const posts: Post[] = [
  {
    operation: CS_USER,
    date: dayjs().format(),
    content:
      'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
    completed: false,
    comments: [
      {
        user: CS_USER,
        date: dayjs()
          .add(1 * -2, 'd')
          .format(),
        message:
          'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
      },
      {
        user: COACH_USER,
        date: dayjs()
          .add(1 * -3, 'd')
          .format(),
        message:
          'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
      },
    ],
  },
  {
    operation: CS_USER,
    date: dayjs()
      .add(1 * -2, 'd')
      .format(),
    content:
      'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
    completed: true,
    comments: [
      {
        user: CS_USER,
        date: dayjs()
          .add(1 * -1, 'd')
          .format(),
        message:
          'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
      },
      {
        user: COACH_USER,
        date: dayjs()
          .add(1 * -4, 'd')
          .format(),
        message:
          'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
      },
    ],
  },
  {
    operation: CS_USER,
    date: dayjs().format(),
    content:
      'ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。ここにはサンプルの文章が入る予定です。',
    completed: true,
    comments: [],
  },
]

export default function fetchPosts(): Post[] {
  return posts
}
