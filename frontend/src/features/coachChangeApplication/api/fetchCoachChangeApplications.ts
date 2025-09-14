import type { CoachChangeApplication } from '@/features/coachChangeApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchCoachChangeApplicationsHttpDocument = HttpDocument<
  { workspaceId: string },
  {
    tab?: string
    keyword?: string
    employeeId?: string
    statusId?: string[]
    resultStatusIds?: string[]
    page?: number
  },
  undefined,
  {
    data: CoachChangeApplication[]
    meta: { total: number; lastPage: number }
  }
>

export async function fetchCoachChangeApplications(
  params: FetchCoachChangeApplicationsHttpDocument['params'],
  options?: FetchCoachChangeApplicationsHttpDocument['options'],
) {
  return await http<FetchCoachChangeApplicationsHttpDocument>(
    '/api/workspaces/:workspaceId/coach-change-applications',
    'GET',
    params,
    options,
  )
}
