import type { Actor, ActorType } from '@/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ActorState = {
  actor: Actor | null
  actorType: ActorType | null
}

export type ActorAction = {
  setActor: (actor: Actor | null) => void
  setActorType: (actorType: ActorType | null) => void
}

export type ActorStore = ActorState & ActorAction

export const defaultInitState: ActorState = {
  actor: null,
  actorType: null,
}

export const useActorStore = create<ActorStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setActor: (actor: Actor | null) => set({ actor }),
      setActorType: (actorType: ActorType | null) => set({ actorType }),
    }),
    {
      name: 'actor-store',
    },
  ),
)
