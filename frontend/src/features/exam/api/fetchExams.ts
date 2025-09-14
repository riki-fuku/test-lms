import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type Response = {
  id: string
  examTypeId: string
  name: string
  examType: {
    id: string
    name: string
    workspaceId: string
  }
}[]

export default async function fetchExams(workspaceId: string) {
  return Http.axios()
    .get<AxiosResponse<Response>>(`api/workspaces/${workspaceId}/exams`)
    .then((res) => res.data.data)
}
