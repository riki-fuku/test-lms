import type { FetchEmployeesHttpDocument } from '@/features/employee/api/fetchEmployees'
import { fetchEmployees } from '@/features/employee/api/fetchEmployees'
import useSWR from 'swr'

export function useFetchEmployees(
  params: FetchEmployeesHttpDocument['params'],
  options?: FetchEmployeesHttpDocument['options'],
) {
  const fetcher = () => fetchEmployees(params, options)
  return useSWR(`/api/workspaces/${params.pathParams?.workspaceId}/employees`, fetcher)
}
