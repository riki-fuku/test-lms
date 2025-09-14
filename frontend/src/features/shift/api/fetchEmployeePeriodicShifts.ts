import type { EmployeePeriodicShift } from '@/features/shift/type/EmployeePeriodicShift'
import { Http } from '@/lib/api-client'

export type FetchEmployeePeriodicShiftQuery = {
  employeeId?: string
}

export default function fetchEmployeePeriodicShifts(query: FetchEmployeePeriodicShiftQuery) {
  return Http.axios()
    .get<{ data: EmployeePeriodicShift[] }>(`/api/employee-periodic-shifts`, {
      params: query,
    })
    .then((res) => res.data.data)
}
