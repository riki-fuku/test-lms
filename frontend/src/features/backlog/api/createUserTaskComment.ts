import { Http } from '@/lib/api-client'

export type CreateUserTaskCommentBody = {
  content: string
  guardType: 'user' | 'employee'
}

export default function createUserTaskComment(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
  body: CreateUserTaskCommentBody,
) {
  return Http.axios()
    .post(
      `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}/user-task-comments`,
      body,
    )
    .then((res) => res.data.data)
}
