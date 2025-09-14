import type { Employee } from '@/features/employee/types'
import { Http } from '@/lib/api-client'

export default function fetchCurrentEmployee(): Promise<Employee> {
  return Http.axios()
    .get('/api/employee/me')
    .then((res) => res.data.data)
}
