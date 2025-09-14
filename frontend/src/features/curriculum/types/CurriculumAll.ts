import type { ChapterAll } from '@/features/curriculum/types/ChapterAll'

export type CurriculumAll = {
  id: string
  workspaceId: string
  title: string
  eyeCatchUrl: string
  detail: string
  order: number
  isPublic: boolean
  chaptersAll?: ChapterAll[]
  updatedAt: string
}
