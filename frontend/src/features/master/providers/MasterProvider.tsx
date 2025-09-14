'use client'

import { createContext, useContext } from 'react'

import type { Master } from '@/features/master/api'

const defaultMasters: Master = {
  application_statuses: [],
  application_result_statuses: [],
  application_types: [],
  user_workspace_statuses: [],
}

export const MasterContext = createContext<{
  masters: Master
}>({
  masters: defaultMasters,
})

export default function MasterProvider({
  children,
  initialMasters,
}: {
  children: React.ReactNode
  initialMasters: Master
}) {
  return (
    <MasterContext.Provider value={{ masters: { ...defaultMasters, ...initialMasters } }}>
      {children}
    </MasterContext.Provider>
  )
}

export function useMasterContext() {
  const context = useContext(MasterContext)

  if (!context) {
    throw new Error('MasterProvider内で利用してください')
  }

  return context
}
