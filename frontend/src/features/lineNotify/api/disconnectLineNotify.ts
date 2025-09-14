import { Http } from '@/lib/api-client'

export type FetchLineNotifyStatusQuery = {
  guardType: 'user' | 'employee'
}

export default function disconnectLineNotify(query: FetchLineNotifyStatusQuery) {
  return Http.axios()
    .delete(`/api/line-notify/disconnect`, { params: query })
    .then((res) => res.data.data)
}
