import fetchEmployeeStudents from '@/features/employee/api/fetchEmployeeStudents'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchEmployeeStudents(
  workspaceId: string,
  employeeId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchEmployeeStudents(workspaceId, employeeId)
  return useSWR(
    [`/api/workspaces/${workspaceId}/employees/${employeeId}/students`],
    fetcher,
    swrOptions,
  )
}
