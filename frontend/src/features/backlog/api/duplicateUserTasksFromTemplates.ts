import { Http } from '@/lib/api-client'

export default function duplicateUserTasksFromTemplates(
  workspaceId: string,
  userId: string,
  projectId: string,
) {
  return Http.axios()
    .post(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/duplicate-from-templates`,
    )
    .then((res) => res.data.data)
}
