import type { EmployeeStudent } from '@/features/employee/types/EmployeeStudent'
import { Http } from '@/lib/api-client'

export default function fetchEmployeeStudents(workspaceId: string, employeeId: string) {
  return Http.axios()
    .get<{ data: EmployeeStudent[] }>(
      `/api/workspaces/${workspaceId}/employees/${employeeId}/students`,
    )
    .then((res) => res.data.data)
}
