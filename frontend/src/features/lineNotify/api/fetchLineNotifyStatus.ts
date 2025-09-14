import { Http } from '@/lib/api-client'

export type FetchLineNotifyStatusQuery = {
  guardType: 'user' | 'employee'
}

export const fetchLineNotifyStatus = async (query: FetchLineNotifyStatusQuery) => {
  return Http.axios()
    .get<{ status: boolean }>('/api/line-notify/status', { params: query })
    .then((res) => res.data)
}
