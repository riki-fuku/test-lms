import type { Chapter } from '@/features/help/types/Chapter'

export type Category = {
  id: string
  workspaceId: string
  title: string
  description: string
  chapters?: Chapter[]
}
