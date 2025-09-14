import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type EmployeeTemporaryShiftBody = {
  startDatetime: string
  endDatetime: string
}

export default function updateEmployeeTemporaryShift(
  shiftId: string,
  query: EmployeeTemporaryShiftBody,
) {
  return Http.axios()
    .patch<AxiosResponse>(`/api/employee-temporary-shifts/${shiftId}`, query)
    .then((res) => {
      return res.data.data
    })
}
