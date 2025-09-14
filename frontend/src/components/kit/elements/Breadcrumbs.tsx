'use client'

import type { BreadcrumbItemProps, BreadcrumbsProps } from '@heroui/react'
import { BreadcrumbItem, Breadcrumbs as HeroBreadcrumbs } from '@heroui/react'

type Item = Omit<BreadcrumbItemProps, 'children'> & {
  children: React.ReactNode
}

type Props = BreadcrumbsProps & {
  items: Item[]
}

export function Breadcrumbs({ items, ...props }: Props) {
  return (
    <HeroBreadcrumbs {...props}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} {...item}>
          {item.children}
        </BreadcrumbItem>
      ))}
    </HeroBreadcrumbs>
  )
}
