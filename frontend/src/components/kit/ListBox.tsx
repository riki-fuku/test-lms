'use client'

import type { ListboxItemProps, ListboxProps, ListboxSectionProps } from '@heroui/react'
import { Listbox, ListboxItem, ListboxSection } from '@heroui/react'

type Item = ListboxItemProps & { children: React.ReactNode }
type Section = ListboxSectionProps & { items: Item[] }

type Props = Omit<ListboxProps, 'children'> & {
  sections?: Section[]
  items?: Item[]
  disableWrapper?: boolean
}

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full rounded-small border-small border-default-200 px-1 py-2'>{children}</div>
)

export function ListBox({ items = [], sections = [], disableWrapper = false, ...props }: Props) {
  if (sections.length > 0) {
    return (
      <ListboxWrapper>
        {sections.map((section, index) => (
          <ListboxSection key={index} title={section.title}>
            {section.items.map((item, index) => (
              <ListboxItem key={index} {...item}>
                {item.children}
              </ListboxItem>
            ))}
          </ListboxSection>
        ))}
      </ListboxWrapper>
    )
  }

  if (disableWrapper) {
    return (
      <Listbox aria-label='Actions' {...props}>
        {items.map((item, index) => (
          <ListboxItem key={index} {...item}>
            {item.children}
          </ListboxItem>
        ))}
      </Listbox>
    )
  }

  return (
    <ListboxWrapper>
      <Listbox aria-label='Actions' {...props}>
        {items.map((item, index) => (
          <ListboxItem key={index} {...item}>
            {item.children}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  )
}
