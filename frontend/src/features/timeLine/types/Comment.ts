import type { COACH_USER, CS_USER, QA_USER } from './../../user/dummyData/user'
export type Comment = {
  user: typeof CS_USER | typeof QA_USER | typeof COACH_USER
  date: string
  message: string
}
