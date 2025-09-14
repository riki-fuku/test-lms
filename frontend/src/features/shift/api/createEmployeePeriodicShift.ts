import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type EmployeePeriodicShiftBody = {
  employeeId: string
  day: number
  startTime: string
  endTime: string
}

export default function createEmployeePeriodicShift(body: EmployeePeriodicShiftBody) {
  return Http.axios()
    .post<AxiosResponse>(`/api/employee-periodic-shifts`, body)
    .then((res) => res.data.data)
}
