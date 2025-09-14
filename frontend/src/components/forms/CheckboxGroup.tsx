'use client'

import type { CheckboxGroupProps as HeroCheckboxGroupProps } from '@heroui/checkbox'
import { CheckboxGroup as HeroCheckboxGroup } from '@heroui/checkbox'

export type CheckboxGroupProps = {
  children: React.ReactNode
} & HeroCheckboxGroupProps

export function CheckboxGroup({ children, ...props }: CheckboxGroupProps) {
  return <HeroCheckboxGroup {...props}>{children}</HeroCheckboxGroup>
}
