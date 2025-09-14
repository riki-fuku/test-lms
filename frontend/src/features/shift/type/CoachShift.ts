export type CoachShift = {
  shift_id: string
  start_datetime: string
  end_datetime: string
  shift_type: 'temporary' | 'periodic'
}
