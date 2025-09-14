export type UserExam = {
  id: string
  name: string
  exams: {
    id: string
    score: string
  }[]
}

export type UserExamsMeta = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
  exams: {
    id: string
    name: string
  }[]
}
