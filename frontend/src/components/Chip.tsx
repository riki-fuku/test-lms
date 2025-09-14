'use client'

import type { ChipProps } from '@heroui/react'
import { Chip as HeroChip } from '@heroui/react'

type Props = ChipProps

export function Chip({ children, ...props }: Props) {
  return <HeroChip {...props}>{children}</HeroChip>
}
