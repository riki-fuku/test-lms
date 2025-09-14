import type { Employee } from '@/features/employee/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type EmployeeState = {
  employee: Employee | null
}

export type EmployeeAction = {
  setEmployee: (employee: Employee | null) => void
}

export type EmployeeStore = EmployeeState & EmployeeAction

export const defaultInitState: EmployeeState = {
  employee: null,
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setEmployee: (employee: Employee | null) => set({ employee }),
    }),
    {
      name: 'employee-store',
    },
  ),
)
