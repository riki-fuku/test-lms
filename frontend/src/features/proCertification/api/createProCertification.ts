import type { ProCertification } from '@/features/proCertification/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type CreateProCertificationHttpDocument = HttpDocument<
  {
    workspaceId: string
    userId: string
  },
  undefined,
  {
    passed_at: string | undefined
    comment: string | undefined
  },
  { data: ProCertification }
>

export async function createProCertification(
  params: CreateProCertificationHttpDocument['params'],
  options?: CreateProCertificationHttpDocument['options'],
) {
  return await http<CreateProCertificationHttpDocument>(
    `/api/workspaces/:workspaceId/users/:userId/pro-certifications`,
    'POST',
    params,
    options,
  )
}
