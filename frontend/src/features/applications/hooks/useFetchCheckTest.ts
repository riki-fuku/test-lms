import fetchCheckTest from '@/features/applications/api/fetchCheckTest'
import useSWR from 'swr'

export default function useFetchCheckTest(workspaceId: string, testId: string) {
  const fetcher = () => fetchCheckTest(workspaceId, testId)
  return useSWR(`/api/workspaces/${workspaceId}/applications/check-test/${testId}`, fetcher)
}
