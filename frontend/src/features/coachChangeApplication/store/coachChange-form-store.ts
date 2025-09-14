import type { FormValues } from '@/features/coachChangeApplication/components'
import { create } from 'zustand'

export type CoachChangeFormState = {
  formValues: FormValues
}

export type CoachChangeFormAction = {
  setFormValues: (formValues: FormValues) => void
}

export type CoachChangeFormStore = CoachChangeFormState & CoachChangeFormAction

export const defaultInitState: FormValues = {
  reason: '',
  otherReason: '',
  detailReason: '',
  interviewDate: '',
  employeeId: '',
}

export const useCoachChangeFormStore = create<CoachChangeFormStore>((set) => ({
  formValues: defaultInitState,
  setFormValues: (formValues: FormValues) => set({ formValues }),
}))
