export type QuestionComment = {
  id: string
  content: string
  createdAt: string
  actor: {
    id: string
    name: string
    nickname: string
    avatar: string
  }
}
