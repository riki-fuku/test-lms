import type { LatestProject } from '@/features/userSprint/types/LatestProject'
import { Http } from '@/lib/api-client'

export default function fetchLatestProject(workspaceId: string, userId: string) {
  return Http.axios()
    .get<{ data: LatestProject }>(`/api/workspaces/${workspaceId}/users/${userId}/projects/latest`)
    .then((res) => res.data.data)
}
