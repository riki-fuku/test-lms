'use client'

import type { ButtonProps } from '@heroui/button'
import { Button as HeroButton } from '@heroui/button'

type Props = {
  children: React.ReactNode
} & ButtonProps

export function Button({ children, ...props }: Props) {
  return <HeroButton {...props}>{children}</HeroButton>
}
