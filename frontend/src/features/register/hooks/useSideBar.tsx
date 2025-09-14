'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type SideBarContextType = {
  currentStep: number
  steps: string[]
  setCurrentStep: (step: number) => void
}

export const SideBarContext = createContext<SideBarContextType>({
  currentStep: 0,
  steps: [],
  setCurrentStep: () => {},
})

type SideBarProviderProps = {
  children: React.ReactNode
}

export function SideBarProvider(props: SideBarProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = useMemo(() => [], [])

  const updateCurrentStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const value = useMemo(
    () => ({
      steps,
      currentStep,
      setCurrentStep: updateCurrentStep,
    }),
    [currentStep, steps, updateCurrentStep],
  )

  return <SideBarContext.Provider value={value}>{props.children}</SideBarContext.Provider>
}

export function useSideBar() {
  return useContext(SideBarContext)
}
