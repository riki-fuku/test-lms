'use client'

import type { TextAreaProps } from '@heroui/react'
import { Textarea as HeroTextarea } from '@heroui/react'

type Props = TextAreaProps

export function Textarea({ ...props }: Props) {
  return <HeroTextarea {...props} />
}
