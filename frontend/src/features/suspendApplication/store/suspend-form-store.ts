import type { FormValues } from '@/features/suspendApplication/components'
import { create } from 'zustand'

export type SuspendFormState = {
  formValues: FormValues
}

export type SuspendFormAction = {
  setFormValues: (formValues: FormValues) => void
}

export type SuspendFormStore = SuspendFormState & SuspendFormAction

export const defaultInitState: FormValues = {
  reason: '',
  otherReason: '',
  detailReason: '',
  preferredStartDate: '',
  preferredEndDate: '',
  interviewDate: '',
  employeeId: '',
}

export const useSuspendFormStore = create<SuspendFormStore>((set) => ({
  formValues: defaultInitState,
  setFormValues: (formValues: FormValues) => set({ formValues }),
}))
