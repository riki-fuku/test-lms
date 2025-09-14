import type { Article } from '@/features/help/types/Article'
import type { Category } from '@/features/help/types/Category'

export type Chapter = {
  id: string
  guideCategoryId: string
  title: string
  articles: Article[]
  category: Category
}
