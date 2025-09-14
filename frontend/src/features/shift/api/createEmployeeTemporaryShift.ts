import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type EmployeeTemporaryShiftBody = {
  employeeId: string
  startDatetime: string
  endDatetime: string
}

export default function createEmployeeTemporaryShift(body: EmployeeTemporaryShiftBody) {
  return Http.axios()
    .post<AxiosResponse>('/api/employee-temporary-shifts', body)
    .then((res) => res.data.data)
}
