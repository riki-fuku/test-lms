import type { EmployeeForCS } from '@/features/employee/types/EmployeeForCS'
import { Http } from '@/lib/api-client'

export default function fetchEmployeesForCS(workspaceId: string) {
  return Http.axios()
    .get<{
      data: EmployeeForCS[]
      meta: { totalAvailableCount: number; totalActiveUserCount: number; totalWorkRate: number }
    }>(`/api/workspaces/${workspaceId}/cs/employees`)
    .then((res) => res.data)
}
