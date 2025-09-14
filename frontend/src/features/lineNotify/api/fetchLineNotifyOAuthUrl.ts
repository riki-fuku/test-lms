import { Http } from '@/lib/api-client'

export type FetchLineNotifyOAuthUrlQuery = {
  guardType: 'user' | 'employee'
  redirectPath: string
}

export const fetchLineNotifyOAuthUrl = async (query: FetchLineNotifyOAuthUrlQuery) => {
  return Http.axios()
    .get<string>('/api/line-notify/oauth-link', {
      params: query,
    })
    .then((res) => res.data)
}
