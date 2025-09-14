import type { Chapter } from '@/features/curriculum/types/Chapter'

export type Section = {
  id: string
  chapterId: string
  title: string
  text: string
  isPublic: boolean
  next: Section | null
  prev: Section | null
  order: number
  estimatedTime: number
  learned: boolean
  updatedAt: string
  chapter?: Chapter
}
