import type { UserSprint } from '@/features/backlog/types/UserSprint'
import { Http } from '@/lib/api-client'

export default function fetchUserSprints(
  workspaceId: string,
  userId: string,
  projectId: string,
  query: { status?: number | null },
) {
  return Http.axios()
    .get<{ data: UserSprint[] }>(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-sprints`,
      {
        params: query,
      },
    )
    .then((res) => res.data.data)
}
