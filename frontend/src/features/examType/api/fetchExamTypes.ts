import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type Response = {
  id: string
  name: string
  workspaceId: string
}[]

export default async function fetchExamTypes(workspaceId: string) {
  return Http.axios()
    .get<AxiosResponse<Response>>(`api/workspaces/${workspaceId}/exam-types`)
    .then((res) => res.data.data)
}
