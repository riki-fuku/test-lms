'use client'

import type { InputProps } from '@heroui/react'
import { Input as HeroInput } from '@heroui/react'

type Props = InputProps

export function Input({ ...props }: Props) {
  return <HeroInput {...props} />
}
