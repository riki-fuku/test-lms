export type CreateTimerBody = {
  user_id: string
  start_datetime: string
  end_datetime: string
  elapsed_seconds: number
  timer_type: 'TIMER' | 'BREAK_TIMER'
}
