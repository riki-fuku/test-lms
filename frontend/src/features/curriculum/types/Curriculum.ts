import type { Chapter } from '@/features/curriculum/types/Chapter'

export type Curriculum = {
  id: string
  workspaceId: string
  title: string
  eyeCatchUrl: string
  description: string
  order: number
  isPublic: boolean
  firstChapter: Chapter
  chapters?: Chapter[]
  progress: number
}
