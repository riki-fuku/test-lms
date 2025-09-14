import type { CoachShift } from '@/features/shift/type/CoachShift'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type FetchCoachShiftQuery = {
  coach_id: string
  start_date: string
  end_date: string
}

export default function fetchCoachShifts(query: FetchCoachShiftQuery) {
  return Http.axios()
    .get<AxiosResponse<CoachShift[]>>('/api/v1/shifts', { params: query })
    .then((res) => res.data.data)
}
