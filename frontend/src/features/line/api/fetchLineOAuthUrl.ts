import { Http } from '@/lib/api-client'
import type { ActorType } from '@/type'

export type FetchLineOAuthUrlQuery = {
  guardType: ActorType
  redirectPath: string
}

export const fetchLineOAuthUrl = async (query: FetchLineOAuthUrlQuery) => {
  return Http.axios()
    .get<string>('/api/line/oauth-link', {
      params: query,
    })
    .then((res) => res.data)
}
