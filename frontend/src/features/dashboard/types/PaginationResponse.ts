import type { Pagination } from '@/constants/paginate'

export type PaginationResponse<T> = {
  data: T[]
  meta: Pagination
}
