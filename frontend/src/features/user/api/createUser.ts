import { Http } from '@/lib/api-client'

type CreateUserBody = {
  firstName: string
  lastName: string
  email: string
  planId?: string
  startingDate?: string
}

export default async function createUser(workspaceId: string, body: CreateUserBody) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/users`, body)
    .then(() => {
      alert('作成しました')
    })
}
