'use client'

import { useMemo } from 'react'

import { Select, type SelectProps } from '@/components/kit'
import { useMasterContext } from '@/features/master/providers'

type Props = SelectProps

export function SelectApplicationStatus({ value, ...props }: Props) {
  const {
    masters: { application_statuses },
  } = useMasterContext()

  const items = useMemo(() => {
    return application_statuses.map((item) => ({
      key: item.value,
      label: item.label,
    }))
  }, [application_statuses])

  return (
    <Select
      aria-label='application-status'
      defaultSelectedKeys={[String(value)]}
      {...props}
      items={items}
    />
  )
}
