'use client'

import { useMemo } from 'react'

import { Select, type SelectProps } from '@/components/kit'
import { useMasterContext } from '@/features/master/providers'

type Props = SelectProps

export function SelectApplicationType({ value, ...props }: Props) {
  const {
    masters: { application_types },
  } = useMasterContext()

  const items = useMemo(() => {
    return application_types.map((item) => ({
      key: item.value,
      label: item.label,
    }))
  }, [application_types])

  return <Select defaultSelectedKeys={[String(value)]} {...props} items={items} />
}
