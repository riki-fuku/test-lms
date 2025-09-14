import type { SuspendApplication } from '@/features/suspendApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchSuspendApplicationsHttpDocument = HttpDocument<
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
    data: SuspendApplication[]
    meta: { total: number; lastPage: number }
  }
>

export async function fetchSuspendApplications(
  params: FetchSuspendApplicationsHttpDocument['params'],
  options?: FetchSuspendApplicationsHttpDocument['options'],
) {
  return await http<FetchSuspendApplicationsHttpDocument>(
    `/api/workspaces/:workspaceId/suspend-applications`,
    'GET',
    params,
    options,
  )
}
