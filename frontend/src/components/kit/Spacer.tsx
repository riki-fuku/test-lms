import type { SpacerProps } from '@heroui/react'
import { Spacer as HeroSpacer } from '@heroui/react'

type Props = SpacerProps

export function Spacer({ ...props }: Props) {
  return <HeroSpacer {...props} />
}
