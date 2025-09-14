import { Http } from '@/lib/api-client'

export default async function fileUpload(workspaceId: string, formData: FormData) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
}
