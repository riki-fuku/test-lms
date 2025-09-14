import type { UserWorkspace } from '@/features/userWorkspace/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type UpdateUserWorkspaceStatusHttpDocument = HttpDocument<
  {
    workspaceId: string
    userId: string
  },
  undefined,
  {
    status_id: number
    changed_reason: string
  },
  { data: UserWorkspace }
>

export async function updateUserWorkspaceStatus(
  params: UpdateUserWorkspaceStatusHttpDocument['params'],
  options?: UpdateUserWorkspaceStatusHttpDocument['options'],
) {
  return await http<UpdateUserWorkspaceStatusHttpDocument>(
    `/api/workspaces/:workspaceId/users/:userId/user-workspaces/status`,
    'PATCH',
    params,
    options,
  )
}
