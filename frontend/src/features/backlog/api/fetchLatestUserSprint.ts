import type { UserSprint } from '@/features/backlog/types/UserSprint'
import { Http } from '@/lib/api-client'

export default function fetchLatestUserSprint(
  workspaceId: string,
  userId: string,
  projectId: string,
) {
  return Http.axios()
    .get<{ data: UserSprint }>(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-sprints/latest`,
    )
    .then((res) => res.data.data)
}
