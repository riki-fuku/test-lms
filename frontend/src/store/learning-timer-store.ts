import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LearningTimerState = {
  timerId: string
}

export type LearningTimerAction = {
  setTimerId: (timerId: string) => void
}

export type LearningTimerStore = LearningTimerState & LearningTimerAction

export const defaultInitState: LearningTimerState = {
  timerId: '',
}

export const useLearningTimerStore = create<LearningTimerStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setTimerId: (timerId: string) => set({ timerId }),
    }),
    {
      name: 'learning-timer-store',
    },
  ),
)
