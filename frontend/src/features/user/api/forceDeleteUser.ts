import { Http } from '@/lib/api-client'

export default async function forceDeleteUser(email: string) {
  return Http.axios().delete(`/api/users/force-delete`, {
    params: { email },
  })
}
