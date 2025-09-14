import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type EmployeePeriodicShiftBody = {
  day: number
  startTime: string
  endTime: string
}

export default function updateEmployeePeriodicShift(
  shiftId: string,
  body: EmployeePeriodicShiftBody,
) {
  return Http.axios()
    .patch<AxiosResponse>(`/api/employee-periodic-shifts/${shiftId}`, body)
    .then((res) => {
      return res.data.data
    })
}
