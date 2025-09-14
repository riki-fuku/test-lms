import type { Employee } from '@/features/employee/types/Employee'
import { Http } from '@/lib/api-client'

type CreateEmployeeBody = {
  firstName: string
  lastName: string
  email: string
  role: string
}

export default function createEmployee(workspaceId: string, body: CreateEmployeeBody) {
  return Http.axios()
    .post<{ data: Employee }>(`/api/workspaces/${workspaceId}/employees`, body)
    .then((res) => res.data.data)
}
