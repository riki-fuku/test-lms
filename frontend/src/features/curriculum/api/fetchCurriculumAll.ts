import type { CurriculumAll } from '@/features/curriculum/types/CurriculumAll'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default async function fetchCurriculumAll(workspaceId: string, curriculumId: string) {
  return Http.axios()
    .get<AxiosResponse<CurriculumAll>>(
      `api/workspaces/${workspaceId}/curriculums/all/${curriculumId}`,
    )
    .then((res) => res.data.data)
}
