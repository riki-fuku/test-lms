import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type CreateQuestionBody = {
  userId: string
  category: number
  title: string
  content: string
  tagIds: string[]
}

type CreateQuestionResponse = {
  questionId: string
}

export default async function createQuestion(workspaceId: string, body: CreateQuestionBody) {
  return Http.axios()
    .post<AxiosResponse<CreateQuestionResponse>>(`/api/workspaces/${workspaceId}/questions`, body)
    .then((res) => res.data.data)
}
