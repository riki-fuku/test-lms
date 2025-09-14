import type { FetchCheckTestsQuery } from '@/features/applications/api/fetchCheckTests'
import fetchCheckTests from '@/features/applications/api/fetchCheckTests'
import useSWR from 'swr'

export default function useFetchCheckTests(workspaceId: string, query: FetchCheckTestsQuery) {
  const fetcher = () => fetchCheckTests(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/applications/check-test`, query], fetcher)
}
