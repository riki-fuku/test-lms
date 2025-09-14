import type { EmployeeShift } from '@/features/shift/type/EmployeeShift'
import { Http } from '@/lib/api-client'

export type FetchEmployeeShiftQuery = {
  employeeId: string
  startDate: string
  endDate: string
}

export default function fetchEmployeeShifts(query: FetchEmployeeShiftQuery) {
  return Http.axios()
    .get<{ data: EmployeeShift[] }>(`/api/employee-shifts`, {
      params: query,
    })
    .then((res) => res.data.data)
}
