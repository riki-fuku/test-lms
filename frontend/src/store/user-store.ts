import type { UserMe } from '@/features/user/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserState = {
  user: UserMe | null
}

export type UserAction = {
  setUser: (user: UserMe | null) => void
}

export type UserStore = UserState & UserAction

export const defaultInitState: UserState = {
  user: null,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (user: UserMe | null) => set({ user }),
    }),
    {
      name: 'user-store',
    },
  ),
)
