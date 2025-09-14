export type UserQueryDeletionRequest = {
  id: number
  user_id: string
  user_query_id: number
  reason: string
  detail: 'pending' | 'accepted' | 'rejected'
}
