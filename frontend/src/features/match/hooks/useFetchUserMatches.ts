import { fetchUserMatches } from '@/features/match/api'
import useSWR from 'swr'

export function useFetchUserMatches(workspaceId: string, userId: string) {
  return useSWR(['/api/workspaces/:workspaceId/users/:userId/matches', workspaceId, userId], () => {
    return fetchUserMatches({
      pathParams: {
        workspaceId,
        userId,
      },
    })
  })
}
