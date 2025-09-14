import type { APPLICATION_TYPE } from '@/features/applications/constants'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type HttpCreateApplicationInterviewEmployee = HttpDocument<
  { workspaceId: string },
  undefined,
  {
    application_type_id: APPLICATION_TYPE
    employee_id: string
  },
  undefined
>

export function createApplicationInterviewEmployee(
  params: HttpCreateApplicationInterviewEmployee['params'],
  options?: HttpCreateApplicationInterviewEmployee['options'],
) {
  return http(
    `/api/workspaces/:workspaceId/application-interview-employees`,
    'POST',
    params,
    options,
  )
}
