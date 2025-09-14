'use client'

import type { DividerProps } from '@heroui/divider'
import { Divider as HeroDivider } from '@heroui/divider'

type Props = DividerProps

export function Divider({ ...props }: Props) {
  return <HeroDivider {...props} />
}
