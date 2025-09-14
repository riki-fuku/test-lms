'use client'

import type { AutocompleteProps } from '@/components/kit/elements'
import { Autocomplete } from '@/components/kit/elements'
import type { EmployeeRole } from '@/features/employee/constants'
import { useFetchEmployees } from '@/features/employee/hooks'
import { useMemo } from 'react'
import type { FetchEmployeesHttpDocument } from '../api'

type Props = Omit<AutocompleteProps, 'items'> & {
  workspaceId: string
  type?: EmployeeRole
}

export function AutocompleteEmployees({ workspaceId, type, ...props }: Props) {
  const queryParams = useMemo(() => {
    const params: FetchEmployeesHttpDocument['params']['queryParams'] = {}
    if (type) {
      params.role = type
    }
    return params
  }, [type])

  const { data: employees } = useFetchEmployees({
    pathParams: { workspaceId },
    queryParams,
  })

  const formattedEmployees = useMemo(() => {
    return employees?.data.map((employee) => ({
      key: employee.id,
      label: employee.name,
    }))
  }, [employees])

  return <Autocomplete {...props} items={formattedEmployees ?? []} />
}
