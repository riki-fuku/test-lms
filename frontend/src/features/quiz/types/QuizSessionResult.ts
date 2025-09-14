import type { Section } from '@/features/curriculum/types/Section'
import type { QuizSession } from '@/features/quiz/types/QuizSession'
import type { QuizSessionQuestion } from '@/features/quiz/types/QuizSessionQuestion'
import type { QuizSessionQuestionChoice } from '@/features/quiz/types/QuizSessionQuestionChoice'
import type { QuizQuestion } from './QuizQuestion'

export type QuizSessionResult = QuizSession & {
  questions: SessionQuestionWithChoices[]
  nextSection: Section | null
}

export type SessionQuestionWithChoices = QuizSessionQuestion & {
  question: QuestionWithSection
  choices: QuizSessionQuestionChoice
}

export type QuestionWithSection = QuizQuestion & {
  section: Section
}
