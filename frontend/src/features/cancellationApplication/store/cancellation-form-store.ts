import type { FormValues } from '@/features/cancellationApplication/components'
import { create } from 'zustand'

export type CancellationFormState = {
  formValues: FormValues
}

export type CancellationFormAction = {
  setFormValues: (formValues: FormValues) => void
}

export type CancellationFormStore = CancellationFormState & CancellationFormAction

export const defaultInitState: FormValues = {
  reason: '',
  otherReason: '',
  detailReason: '',
  interviewDate: '',
  employeeId: '',
}

export const useCancellationFormStore = create<CancellationFormStore>((set) => ({
  formValues: defaultInitState,
  setFormValues: (formValues: FormValues) => set({ formValues }),
}))
