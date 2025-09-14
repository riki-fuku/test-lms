import type { Match } from '@/features/match/types/Match'
import { Http } from '@/lib/api-client'

export type FetchMatchesQuery = {
  userIds?: string[]
  employeeIds?: string[]
  isActive?: boolean
}

export default function fetchMatches(workspaceId: string, query: FetchMatchesQuery) {
  return Http.axios()
    .get<{ data: Match[] }>(`/api/workspaces/${workspaceId}/matches`, { params: query })
    .then((res) => res.data.data)
}
