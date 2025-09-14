import type TERM from '@/features/term/constants/term'

export type Term = {
  id: string
  name: (typeof TERM)[keyof typeof TERM]
}
