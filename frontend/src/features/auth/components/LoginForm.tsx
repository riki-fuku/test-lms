'use client'

import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import Input from '@/components/ui/Input'
import InputPassword from '@/components/ui/InputPassword'
import { ACCOUNT_TYPE } from '@/constants'
import type { LoginType } from '@/features/auth/api/login'
import login from '@/features/auth/api/login'
import fetchCurrentEmployee from '@/features/employee/api/fetchCurrentEmployee'
import fetchMeAsUser from '@/features/user/api/fetchMeAsUser'
import { useLoading } from '@/hooks/useLoading'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useActorStore } from '@/store/actor-store'
import { useEmployeeStore } from '@/store/employee-store'
import { useUserStore } from '@/store/user-store'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const [value, setValue] = useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <div className='w-[600px] rounded bg-white px-3 py-8 lg:p-12'>
        <div className='relative h-6 lg:w-full'>
          <Image src='/images/logo.svg' alt='ロゴ' fill />
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='mt-4'>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label='受講生としてログイン'
              className={`w-1/2 ${value === 1 ? 'text-text-primary' : ''}`}
              value={1}
            />
            <Tab
              label='運営としてログイン'
              className={`w-1/2 ${value === 2 ? 'text-text-primary' : ''}`}
              value={2}
            />
          </Tabs>
        </Box>

        <Form type='user' value={value} index={1} />
        <Form type='employee' value={value} index={2} />
      </div>
    </>
  )
}

const Form = ({ type, value, index }: { type: LoginType; value: number; index: number }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showSuccess, showError } = useSnackbar()
  const { start, end } = useLoading()

  const nextPage = async () => {
    if (type === 'user') {
      const user = await fetchMeAsUser()
      // TODO: useUserStore, useActorStoreが使われなくなったら削除
      useUserStore.getState().setUser(user)
      // -----------------------------------------------------
      useActorStore.getState().setActor(user)
      useActorStore.getState().setActorType(ACCOUNT_TYPE.USER)
      if (user.profileSetupCompleted) {
        router.push(`/renewal/user/${user.activeWorkspace.workspaceId}/dashboard`)
      } else {
        router.push(`/renewal/user/${user.activeWorkspace.workspaceId}/register/password`)
      }
    } else if (type === 'employee') {
      const employee = await fetchCurrentEmployee()
      // TODO: useUserStore, useActorStoreが使われなくなったら削除
      useEmployeeStore.getState().setEmployee(employee)
      // -----------------------------------------------------
      useActorStore.getState().setActor(employee)
      useActorStore.getState().setActorType(ACCOUNT_TYPE.EMPLOYEE)
      if (!employee.profileSetupCompleted) {
        if (employee.role === 'coach') {
          router.push(`/renewal/employee/${employee.activeWorkspace.workspaceId}/register/password`)
          return
        }
      }

      if (employee.role === 'admin') {
        router.push(`/renewal/employee/${employee.activeWorkspace.workspaceId}/admin/chat`)
      } else if (employee.role === 'cs') {
        router.push(`/renewal/employee/${employee.activeWorkspace.workspaceId}/cs/users/`)
      } else if (employee.role === 'coach') {
        router.push(`/renewal/employee/${employee.activeWorkspace.workspaceId}/meetings`)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    start()
    await login(
      { requestBody: { type, email, password } },
      {
        callbacks: {
          onSuccess: () => {
            showSuccess('ログインに成功しました')
            nextPage()
          },
          onAuthError: () => {
            showError('ログインに失敗しました')
          },
        },
      },
    )
    end()
  }

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <form className='mt-10 flex flex-col gap-5' onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='メールアドレス'
          type='email'
        />
        <InputPassword onChange={(e) => setPassword(e.target.value)} placeholder='パスワード' />
        <Button className='w-full'>ログイン</Button>

        <div>
          <Link href={`/renewal/forgot-password?actorType=${type}`}>
            パスワードを忘れた場合はこちら
          </Link>
        </div>
      </form>
    </div>
  )
}
