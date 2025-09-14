import { Http } from '@/lib/api-client'
import type { ActorType } from '@/type'

export type FetchLineStatusQuery = {
  guardType: ActorType
}

export default function disconnectLine(query: FetchLineStatusQuery) {
  return Http.axios()
    .delete(`/api/line/disconnect`, { params: query })
    .then((res) => res.data.data)
}
