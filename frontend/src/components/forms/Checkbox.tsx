'use client'

import type { CheckboxProps } from '@heroui/checkbox'
import { Checkbox as HeroCheckbox } from '@heroui/checkbox'

type Props = {
  children: React.ReactNode
} & CheckboxProps

export function Checkbox({ children, ...props }: Props) {
  return <HeroCheckbox {...props}>{children}</HeroCheckbox>
}
