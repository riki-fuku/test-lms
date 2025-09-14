'use client'

import type { User } from '@/features/user/types/User'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const guestPage = [
  '/help/',
  '/help/categories/[categoryId]/',
  '/help/categories/[categoryId]/chapters/[chapterId]/',
  '/help/categories/[categoryId]/chapters/[chapterId]/articles/[articleId]/',
  '/help/search/',
  '/',
  '/privacy/',
]

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { showSnackbar } = useSnackbar()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!guestPage.includes(window.location.pathname)) {
      fetchUser()
    }
  }, [params, searchParams])

  const fetchUser = useCallback(async () => {
    try {
      // setUser(await fetchUserMe())
    } catch (error) {
      showSnackbar('ユーザ情報の取得に失敗しました', 'error')
      router.push('/renewal/user/login')
    }
  }, [router, showSnackbar])

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserはUserProviderの中で使用してください')
  }
  return context
}
