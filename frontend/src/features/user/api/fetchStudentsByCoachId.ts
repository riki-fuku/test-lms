import type { CoachStudent } from '@/features/user/types/CoachStudent'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default function fetchStudentsByCoachId(coachId: string) {
  return Http.axios()
    .get<AxiosResponse<CoachStudent[]>>(`/api/v1/coaches/${coachId}/students`)
    .then((res) => res.data.data)
}
