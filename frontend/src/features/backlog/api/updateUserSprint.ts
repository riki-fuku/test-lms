import { Http } from '@/lib/api-client'

type UpdateUserSprintBody = {
  status: number
}

export default function updateUserSprint(
  workspaceId: string,
  userId: string,
  projectId: string,
  sprintId: string,
  body: UpdateUserSprintBody,
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-sprints/${sprintId}`,
      body,
    )
    .then((res) => res.data.data)
}
