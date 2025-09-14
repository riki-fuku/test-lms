import { Http } from '@/lib/api-client'
import type { ActorType } from '@/type'

export type FetchLineStatusQuery = {
  guardType: ActorType
}

export const fetchLineStatus = async (query: FetchLineStatusQuery) => {
  return Http.axios()
    .get<{ status: boolean }>('/api/line/status', { params: query })
    .then((res) => res.data)
}
