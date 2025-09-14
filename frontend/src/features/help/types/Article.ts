import type { Chapter } from '@/features/help/types/Chapter'

export type Article = {
  id: string
  guideChapterId: string
  title: string
  content: string
  chapter?: Chapter
}
