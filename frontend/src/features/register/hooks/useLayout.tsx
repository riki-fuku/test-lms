'use client'

import { createContext, useContext, useState } from 'react'

type LayoutContextType = {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
}

export const LayoutContext = createContext<LayoutContextType>({
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
})

type LayoutProviderProps = {
  children: React.ReactNode
}

export function LayoutProvider(props: LayoutProviderProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const value = {
    title,
    setTitle,
    description,
    setDescription,
  }

  return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>
}

export function useLayout() {
  return useContext(LayoutContext)
}
