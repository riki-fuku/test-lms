import type { ExtensionApplication } from '@/features/applications/types/ExtensionApplication'
import { Http } from '@/lib/api-client'

export type ExtensionApplicationBody = {
  userId: string
  extensionPlanId: number
  termsAcceptedAt: string
  email: string | null
  additionalInfo: string | null
}

export default function postExtensionApplication(
  workspaceId: string,
  body: ExtensionApplicationBody,
) {
  return Http.axios()
    .post<{ data: ExtensionApplication }>(
      `/api/workspaces/${workspaceId}/applications/extension`,
      body,
    )
    .then((res) => res.data.data)
}
