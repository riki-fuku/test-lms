import type { FetchNoMeetingUsersQuery } from '@/features/employee/api/fetchNoMeetingUsers'
import fetchNoMeetingUsers from '@/features/employee/api/fetchNoMeetingUsers'
import useSWR from 'swr'

export default function useFetchNoMeetingUsers(
  workspaceId: string,
  query: FetchNoMeetingUsersQuery,
) {
  const fetcher = () => fetchNoMeetingUsers(workspaceId, query)
  const { data, isLoading, error } = useSWR(
    [`/api/workspaces/${workspaceId}/no-meeting-users`, query],
    fetcher,
  )
  return { data, isLoading, error }
}
