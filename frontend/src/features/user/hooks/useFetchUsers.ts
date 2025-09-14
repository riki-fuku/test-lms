import type { FetchUsersHttpDocument } from '@/features/user/api'
import { fetchUsers } from '@/features/user/api'
import useSWR from 'swr'

export default function useFetchUsers(
  params: FetchUsersHttpDocument['params'],
  options?: FetchUsersHttpDocument['options'],
) {
  const fetcher = () => {
    return fetchUsers(params, options)
  }

  const queryString = new URLSearchParams()
  if (params.queryParams?.keyword) {
    queryString.append('keyword', params.queryParams.keyword)
  }
  if (params.queryParams?.page) {
    queryString.append('page', params.queryParams.page.toString())
  }
  const cacheKey = `/api/workspaces/${params.pathParams?.workspaceId}/users?${queryString.toString()}`
  return useSWR(cacheKey, fetcher)
}
