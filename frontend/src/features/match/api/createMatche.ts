import type { Match } from '@/features/match/types/Match'
import { Http } from '@/lib/api-client'

export type CreateMatchBody = {
  userId: string
  employeeId: string
}

export default function createMatch(workspaceId: string, body: CreateMatchBody) {
  return Http.axios()
    .post<{ data: Match[] }>(`/api/workspaces/${workspaceId}/matches`, body)
    .then((res) => res.data.data)
}
