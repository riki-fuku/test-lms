'use client'

import { Accordion, AccordionItem } from '@heroui/react'

interface ToggleCardProps {
  children: React.ReactNode
  title: string
}

export function ToggleCard({ children, title }: ToggleCardProps) {
  return (
    <Accordion>
      <AccordionItem
        key='1'
        aria-label={title}
        title={title}
        classNames={{
          base: 'rounded-lg overflow-hidden',
          heading: 'bg-bg-tertiary',
          content: 'bg-white',
          trigger: 'px-4',
          title: 'text-white',
          indicator: 'text-white',
        }}
      >
        <div className='bg-white px-2 py-5'>{children}</div>
      </AccordionItem>
    </Accordion>
  )
}
