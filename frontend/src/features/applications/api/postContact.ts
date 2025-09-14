import type { ContactReq, ContactRes } from '@/features/applications/types/Contact'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default function postContact(data: ContactReq) {
  return Http.axios()
    .post<AxiosResponse<ContactRes>>(`/api/workspaces/${data.workspaceId}/contact`, data)
    .then((res) => res.data.data)
}
