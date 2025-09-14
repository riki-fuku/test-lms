'use client'

import type { RadioGroupProps, RadioProps } from '@heroui/react'
import { RadioGroup as HeroRadioGroup, Radio } from '@heroui/react'

type Props = RadioGroupProps & {
  items?: (RadioProps & { label: string })[]
}

export function RadioGroup({ items, children, ...props }: Props) {
  if (children) {
    return <HeroRadioGroup {...props}>{children}</HeroRadioGroup>
  }

  return (
    <HeroRadioGroup {...props}>
      {items?.map((item, index) => (
        <Radio key={index} {...item}>
          {item.label}
        </Radio>
      ))}
    </HeroRadioGroup>
  )
}
