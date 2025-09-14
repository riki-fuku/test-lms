import type { Pagination } from '@/constants/paginate'
import type { Meeting } from '@/features/meeting/types/Meeting'
import { Http } from '@/lib/api-client'

export type FetchMeetingsQuery = {
  status?: number
  statuses?: number[]
  employeeId?: string
  userId?: string
  userName?: string
  startDatetime?: string | null
  endDatetime?: string | null
  page?: number
  sort?: 'asc' | 'desc'
}

export default function fetchMeetings(workspaceId: string, query: FetchMeetingsQuery) {
  return Http.axios()
    .get<{ data: Meeting[]; meta: Pagination }>(`/api/workspaces/${workspaceId}/meetings`, {
      params: query,
    })
    .then((res) => res.data)
}
