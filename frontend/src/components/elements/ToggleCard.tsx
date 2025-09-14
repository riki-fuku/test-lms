'use client'

import { Accordion, AccordionItem } from '@heroui/react'

interface ToggleCardProps {
  children: React.ReactNode
  title: string
  className?: string
}

export function ToggleCard({ children, title, className }: ToggleCardProps) {
  return (
    <Accordion className={className}>
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
