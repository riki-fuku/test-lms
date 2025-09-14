'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type LoadingContextType = {
  isLoading: boolean
  start: () => void
  end: () => void
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  start: () => {},
  end: () => {},
  setIsLoading: () => {},
})

type LoadingProviderProps = {
  children: React.ReactNode
}

export function LoadingProvider(props: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const start = () => {
    setIsLoading(true)
  }

  const end = () => {
    setIsLoading(false)
  }

  const value = useMemo(
    () => ({
      isLoading,
      start,
      end,
      setIsLoading,
    }),
    [isLoading],
  )

  return (
    <LoadingContext.Provider value={value}>
      <>{props.children}</>
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}
