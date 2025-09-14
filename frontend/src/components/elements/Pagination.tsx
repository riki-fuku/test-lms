import type { PaginationProps } from '@heroui/react'
import { Pagination as HeroPagination } from '@heroui/react'

type Props = PaginationProps

export function Pagination({ ...props }: Props) {
  return <HeroPagination {...props} />
}
