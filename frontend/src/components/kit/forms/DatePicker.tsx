'use client'

import type { DatePickerProps } from '@heroui/react'
import { DatePicker as HeroDatePicker } from '@heroui/react'

type Props = DatePickerProps

export function DatePicker({ ...props }: Props) {
  return <HeroDatePicker {...props} />
}
