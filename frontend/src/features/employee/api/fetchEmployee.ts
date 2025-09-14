import type { Employee } from '@/features/employee/types/Employee'
import type { EmployeeForCS } from '@/features/employee/types/EmployeeForCS'
import { Http } from '@/lib/api-client'

export default function fetchEmployee(workspaceId: string, employeeId: string) {
  return Http.axios()
    .get<{ data: Employee | EmployeeForCS }>(
      `/api/workspaces/${workspaceId}/employees/${employeeId}`,
    )
    .then((res) => res.data.data)
}
