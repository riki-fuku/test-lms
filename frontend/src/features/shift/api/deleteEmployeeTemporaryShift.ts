import { Http } from '@/lib/api-client'

export default function deleteEmployeeTemporaryShift(shiftId: string) {
  return Http.axios()
    .delete(`/api/employee-temporary-shifts/${shiftId}`)
    .then((res) => res.data)
}
