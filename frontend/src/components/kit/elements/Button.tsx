'use client'

import type { ButtonProps as HeroButtonProps } from '@heroui/button'
import { Button as HeroButton } from '@heroui/button'

export type ButtonProps = {
  children: React.ReactNode
} & HeroButtonProps

export function Button({ children, ...props }: ButtonProps) {
  return <HeroButton {...props}>{children}</HeroButton>
}
