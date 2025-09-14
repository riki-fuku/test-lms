import fetchEmployeesForCS from '@/features/employee/api/fetchEmployeesForCS'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchEmployeesForCS(workspaceId: string, swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchEmployeesForCS(workspaceId)
  return useSWR([`/api/workspaces/${workspaceId}/cs/employees`], fetcher, swrOptions)
}
