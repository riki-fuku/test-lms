'use client'

import { useMemo } from 'react'

import type { CheckboxGroupProps } from '@/components/kit'
import { Checkbox, CheckboxGroup } from '@/components/kit'
import { useMasterContext } from '@/features/master/providers'

type Props = Omit<CheckboxGroupProps, 'children'>

export function CheckGroupApplicationResultStatus({ ...props }: Props) {
  const {
    masters: { application_result_statuses },
  } = useMasterContext()

  const items = useMemo(() => {
    return application_result_statuses.map((item) => ({
      key: item.value,
      label: item.label,
    }))
  }, [application_result_statuses])

  return (
    <CheckboxGroup {...props}>
      {items.map((item) => (
        <Checkbox key={item.key} value={String(item.key)} classNames={{ wrapper: 'bg-white' }}>
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}
