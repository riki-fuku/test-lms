import type { Employee } from '@/features/employee/types/Employee'
import { Http } from '@/lib/api-client'

export default function fetchEmployeeMe() {
  return Http.axios()
    .get<{ data: Employee }>(`/api/employee/me`)
    .then((res) => res.data.data)
}
