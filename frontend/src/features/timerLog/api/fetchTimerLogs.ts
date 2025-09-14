import { Http } from '@/lib/api-client'

type fetchTimerLogsQuery = {
  user_id?: string
  start_date?: string
  end_date?: string
}

export default function fetchTimerLogs(query: fetchTimerLogsQuery) {
  return Http.axios()
    .get('/api/timer-logs', { params: query })
    .then((res) => res.data.data)
}
