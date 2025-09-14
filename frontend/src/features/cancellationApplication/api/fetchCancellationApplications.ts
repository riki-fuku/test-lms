import type { CancellationApplication } from '@/features/cancellationApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchCancellationApplicationsHttpDocument = HttpDocument<
  { workspaceId: string },
  {
    tab?: string
    keyword?: string
    employeeId?: string
    statusIds?: string[]
    resultStatusIds?: string[]
    page?: number
  },
  undefined,
  {
    data: CancellationApplication[]
    meta: { total: number; lastPage: number }
  }
>

export async function fetchCancellationApplications(
  params: FetchCancellationApplicationsHttpDocument['params'],
  options?: FetchCancellationApplicationsHttpDocument['options'],
) {
  return await http<FetchCancellationApplicationsHttpDocument>(
    `/api/workspaces/:workspaceId/cancellation-applications`,
    'GET',
    params,
    options,
  )
}
