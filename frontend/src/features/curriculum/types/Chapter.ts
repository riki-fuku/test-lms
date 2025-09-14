import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import type { Section } from '@/features/curriculum/types/Section'

export type Chapter = {
  id: string
  curriculumId: string
  title: string
  order: number
  isPublic: boolean
  isPassed: boolean
  curriculum?: Curriculum
  sections?: Section[]
  firstSection: Section
}
