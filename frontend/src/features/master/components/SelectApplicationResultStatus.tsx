'use client'

import { useMemo } from 'react'

import { Select, type SelectProps } from '@/components/kit'
import { useMasterContext } from '@/features/master/providers'

type Props = SelectProps

export function SelectApplicationResultStatus({ value, ...props }: Props) {
  const {
    masters: { application_result_statuses },
  } = useMasterContext()

  const items = useMemo(() => {
    return application_result_statuses.map((item) => ({
      key: item.value,
      label: item.label,
    }))
  }, [application_result_statuses])

  return <Select defaultSelectedKeys={[String(value)]} {...props} items={items} />
}
