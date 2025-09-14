'use client'

import type { SelectProps as HeroSelectProps, SelectItemProps } from '@heroui/react'
import { Select as HeroSelect, SelectItem } from '@heroui/react'

export type SelectProps = Omit<HeroSelectProps, 'children'> & {
  children?: HeroSelectProps['children']
  items?: (SelectItemProps & { label: string })[]
}

export function Select({ items = [], children, ...props }: SelectProps) {
  if (children) {
    return <HeroSelect {...props}>{children}</HeroSelect>
  }

  return (
    <HeroSelect {...props}>
      {items && (
        <>
          {items.map((item, index) => (
            <SelectItem key={item.key ?? index}>{item.label}</SelectItem>
          ))}
        </>
      )}
    </HeroSelect>
  )
}
