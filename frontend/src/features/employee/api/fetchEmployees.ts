import type { Pagination } from '@/constants/paginate'
import type { Employee, EmployeeRole } from '@/features/employee/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchEmployeesHttpDocument = HttpDocument<
  { workspaceId: string },
  { role?: EmployeeRole },
  undefined,
  { data: Employee[]; meta: Pagination }
>

export async function fetchEmployees(
  params: FetchEmployeesHttpDocument['params'],
  options?: FetchEmployeesHttpDocument['options'],
) {
  return await http<FetchEmployeesHttpDocument>(
    `/api/workspaces/:workspaceId/employees`,
    'GET',
    params,
    options,
  )
}
