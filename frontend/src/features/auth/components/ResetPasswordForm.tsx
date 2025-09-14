'use client'

import Button from '@/components/ui/Button'
import InputPassword from '@/components/ui/InputPassword'
import { resetPassword } from '@/features/auth/api/resetPassword'
import useValidation from '@/hooks/useValidation'
import { useMemo, useState } from 'react'

export type ResetPasswordFormProps = {
  guardType: 'user' | 'employee'
  email: string
  token: string
  onComplete: () => void
}

export default function ResetPasswordForm({
  guardType,
  email,
  token,
  onComplete,
}: ResetPasswordFormProps) {
  const [password, setPasswordInput] = useState('')
  const [passwordConfirmation, setConfirmInput] = useState('')

  const isMatch = useMemo(() => {
    return password === passwordConfirmation
  }, [password, passwordConfirmation])

  const validation = useValidation()
  const isCanUse = useMemo(() => {
    return validation.checkCanUse(password)
  }, [password, validation])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await resetPassword({
      guardType,
      email,
      token,
      password,
      passwordConfirmation,
    })

    onComplete()
  }

  const innerTextStyle = 'text-sm lg:text-md'

  return (
    <div className='rounded bg-white px-3 py-8 lg:p-12'>
      <p className='text-md font-bold lg:hidden'>※注意事項</p>
      <div className='rounded bg-bg-secondary sm:p-3 lg:p-8'>
        <p className='hidden text-base font-bold lg:block'>※注意事項</p>
        <div className='flex flex-col gap-2 p-2 lg:mt-5 lg:gap-4 lg:p-0'>
          <p className={innerTextStyle}>
            ・使用可能な文字列は、半角英小文字、半角英大文字、ハイフン（-）、ピリオド（.）、アンダーバー（_）です。
          </p>
          <p className={innerTextStyle}>
            ・パスワードの先頭には、ハイフン（-）、ピリオド（.）、アンダーバー（_）等の記号は使用できません。
          </p>
        </div>
      </div>
      <form className='mx-auto mt-8 flex flex-col gap-5 lg:w-3/4' onSubmit={handleSubmit}>
        <div className='items-center lg:grid lg:grid-cols-3'>
          <p className='text-md'>パスワード</p>
          <InputPassword
            className='mt-2 w-full lg:col-start-2 lg:col-end-4 lg:mt-0'
            placeholder='パスワードを入力'
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div className='text-sm text-text-red-primary lg:col-start-2 lg:col-end-4'>
            {isCanUse !== null && !isCanUse && <p>使用不可能な文字列が含まれています。</p>}
          </div>
        </div>
        <div className='items-center lg:grid lg:grid-cols-3'>
          <p className='text-md'>パスワード（確認）</p>
          <InputPassword
            className='mt-2 w-full lg:col-start-2 lg:col-end-4 lg:mt-0'
            placeholder='パスワードを入力'
            onChange={(e) => setConfirmInput(e.target.value)}
          />
          <div className='text-sm text-text-red-primary lg:col-start-2 lg:col-end-4'>
            {isMatch !== null && !isMatch && (
              <p>パスワードとパスワード（確認）が異なっています。</p>
            )}
          </div>
        </div>
        <Button className='mx-auto mt-5 w-10'>パスワードを設定</Button>
      </form>
    </div>
  )
}
