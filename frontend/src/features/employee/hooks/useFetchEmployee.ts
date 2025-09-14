import fetchEmployee from '@/features/employee/api/fetchEmployee'
import useSWR from 'swr'

export default function useFetchEmployee(workspaceId: string, employeeId: string) {
  const fetcher = () => fetchEmployee(workspaceId, employeeId)
  return useSWR([`/api/workspaces/${workspaceId}/employees/${employeeId}`], fetcher)
}
