import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type DeleteProCertificationHttpDocument = HttpDocument<
  {
    workspaceId: string
    userId: string
    proCertificationId: string
  },
  undefined,
  {
    comment: string
  },
  undefined
>

export async function deleteProCertification(params: DeleteProCertificationHttpDocument['params']) {
  return await http<DeleteProCertificationHttpDocument>(
    `/api/workspaces/:workspaceId/users/:userId/pro-certifications/:proCertificationId`,
    'DELETE',
    params,
  )
}
