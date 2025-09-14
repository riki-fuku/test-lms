import type { FetchMatchesQuery } from '@/features/match/api/fetchMatches'
import fetchMatches from '@/features/match/api/fetchMatches'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchMatches(
  workspaceId: string,
  query: FetchMatchesQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchMatches(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/matches`, query], fetcher, swrOptions)
}
