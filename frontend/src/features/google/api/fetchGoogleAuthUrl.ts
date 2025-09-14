import { Http } from '@/lib/api-client'

export type FetchGoogleAuthUrlQuery = {
  guardType: 'user' | 'employee'
  redirectPath: string
}

export default function fetchGoogleAuthUrl(query: FetchGoogleAuthUrlQuery) {
  return Http.axios()
    .get<string>(`/api/auth/google-oauth`, {
      params: query,
    })
    .then((res) => res.data)
}
