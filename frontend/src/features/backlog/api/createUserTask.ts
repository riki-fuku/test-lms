import { Http } from '@/lib/api-client'

type CreateUserTaskBody = {
  userSprintId: string | null
  status: number
  type: number
  summary: string
  description: string | null | undefined
  estimate: number | null
  order: number | null | undefined
}

export default function createUserTask(
  workspaceId: string,
  userId: string,
  projectId: string,
  body: CreateUserTaskBody,
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks`, body)
    .then((res) => res.data.data)
}
