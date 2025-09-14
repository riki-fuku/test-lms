import type { SectionAll } from '@/features/curriculum/types/SectionAll'

export type ChapterAll = {
  id: string
  curriculumId: string
  title: string
  order: number
  isPublic: boolean
  isPassed: boolean
  sectionsAll?: SectionAll[]
}
