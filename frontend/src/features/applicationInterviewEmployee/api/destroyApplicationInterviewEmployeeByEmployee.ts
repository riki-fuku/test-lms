import type { APPLICATION_TYPE } from '@/features/applications/constants'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type ApplicationTypeId = APPLICATION_TYPE | number

export type HttpDestroyApplicationInterviewEmployeeByEmployee = HttpDocument<
  { workspaceId: string; employeeId: string },
  {
    application_type_ids?: ApplicationTypeId[]
    application_type_id?: ApplicationTypeId
  },
  undefined,
  undefined
>

export function destroyApplicationInterviewEmployeeByEmployee(
  params: HttpDestroyApplicationInterviewEmployeeByEmployee['params'],
  options?: HttpDestroyApplicationInterviewEmployeeByEmployee['options'],
) {
  return http(
    `/api/workspaces/:workspaceId/employees/:employeeId/application-interview-employees`,
    'DELETE',
    params,
    options,
  )
}
