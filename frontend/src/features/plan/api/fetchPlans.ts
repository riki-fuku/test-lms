import type { Plan } from '@/features/plan/types/Plan'
import { Http } from '@/lib/api-client'

export default function fetchPlans(workspaceId: string) {
  return Http.axios()
    .get<{ data: Plan[] }>(`/api/workspaces/${workspaceId}/plans`)
    .then((res) => res.data.data)
}
