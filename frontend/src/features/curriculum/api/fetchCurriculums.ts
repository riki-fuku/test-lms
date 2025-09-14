import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default async function fetchCurriculums(workspaceId: string) {
  return Http.axios()
    .get<AxiosResponse<Curriculum[]>>(`api/workspaces/${workspaceId}/curriculums`)
    .then((res) => res.data.data)
}
