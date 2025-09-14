import { Http } from '@/lib/api-client'

type FetchUserExamsQuery = {
  keyword?: string
  page?: number
}

type Response = {
  data: {
    id: string
    name: string
    exams: {
      id: string
      score: string
    }[]
  }[]
  meta: {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
    exams: {
      id: string
      name: string
    }[]
  }
}

export default function fetchUserExams(workspaceId: string, query: FetchUserExamsQuery) {
  return Http.axios()
    .get<Response>(`/api/workspaces/${workspaceId}/user-exams`, {
      params: query,
    })
    .then((res) => res.data)
}
