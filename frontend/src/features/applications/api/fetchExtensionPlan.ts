import type { ExtensionPlan } from '@/features/applications/types/ExtensionPlan'
import { Http } from '@/lib/api-client'

export default async function fetchExtensionPlan(workspaceId: string) {
  return await Http.axios()
    .get<{ data: ExtensionPlan[] }>(`/api/workspaces/${workspaceId}/applications/extension/plans`)
    .then((res) => res.data.data)
}
