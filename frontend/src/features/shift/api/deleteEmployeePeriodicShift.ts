import { Http } from '@/lib/api-client'

export default function deleteEmployeePeriodicShift(shiftId: string) {
  return Http.axios()
    .delete(`/api/employee-periodic-shifts/${shiftId}`)
    .then((res) => res.data)
}
