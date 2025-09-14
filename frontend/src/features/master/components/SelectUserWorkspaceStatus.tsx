'use client'

import { useMemo } from 'react'

import { Select, type SelectProps } from '@/components/kit'
import { useMasterContext } from '@/features/master/providers'

type Props = SelectProps

export function SelectUserWorkspaceStatus({ value, ...props }: Props) {
  const {
    masters: { user_workspace_statuses },
  } = useMasterContext()

  const items = useMemo(() => {
    return user_workspace_statuses.map((item) => ({
      key: item.value,
      label: item.label,
    }))
  }, [user_workspace_statuses])

  return <Select defaultSelectedKeys={[String(value)]} {...props} items={items} />
}
