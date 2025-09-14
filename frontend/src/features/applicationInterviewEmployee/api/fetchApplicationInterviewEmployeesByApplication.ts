import type { APPLICATION_TYPE } from '@/features/applications/constants'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type ApplicationInterviewEmployeeByApplication = {
  enabled: boolean
  employee: {
    id: string
    fullName: string
  }
}

export type HttpFetchApplicationInterviewEmployeesByApplication = HttpDocument<
  { workspaceId: string },
  {
    application_type: APPLICATION_TYPE
  },
  undefined,
  {
    data: ApplicationInterviewEmployeeByApplication[]
  }
>

export function fetchApplicationInterviewEmployeesByApplication(
  params: HttpFetchApplicationInterviewEmployeesByApplication['params'],
  options?: HttpFetchApplicationInterviewEmployeesByApplication['options'],
) {
  return http(
    `/api/workspaces/:workspaceId/application-interview-employees/application`,
    'GET',
    params,
    options,
  )
}
