'use client'

import type {
  AutocompleteItemProps,
  AutocompleteProps as HeroAutocompleteProps,
} from '@heroui/autocomplete'
import { AutocompleteItem, Autocomplete as HeroAutocomplete } from '@heroui/autocomplete'

export type AutocompleteProps = Omit<HeroAutocompleteProps, 'children'> & {
  items: (AutocompleteItemProps & { label: string })[]
  children?: React.ReactNode
}

export function Autocomplete({ children, items, ...props }: AutocompleteProps) {
  if (children && typeof children === 'object' && 'type' in children) {
    return <HeroAutocomplete {...props}>{children}</HeroAutocomplete>
  }

  return (
    <HeroAutocomplete {...props}>
      {items.map((item) => (
        <AutocompleteItem key={item.key} {...item}>
          {item.label}
        </AutocompleteItem>
      ))}
    </HeroAutocomplete>
  )
}
