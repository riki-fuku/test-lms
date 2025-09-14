import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type EmployeeExcludeDateBody = {
  employeePeriodicShiftId: string
  date: string
}

export default function createEmployeeShiftExcludeDate(body: EmployeeExcludeDateBody) {
  return Http.axios()
    .post<AxiosResponse>('/api/employee-shift-exclude-dates', body)
    .then((res) => res.data.data)
}
