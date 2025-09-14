import type { CheckTestRes } from '@/features/applications/types/CheckTest'
import { Http } from '@/lib/api-client'

export default function updateCheckTest(
  workspaceId: string,
  id: string,
  body: {
    githubRepositoryUrl?: string
    submissionDate?: string
    status?: number
  },
) {
  return Http.axios()
    .patch<{ data: CheckTestRes }>(
      `/api/workspaces/${workspaceId}/applications/check-test/${id}`,
      body,
    )
    .then((res) => res.data.data)
}
