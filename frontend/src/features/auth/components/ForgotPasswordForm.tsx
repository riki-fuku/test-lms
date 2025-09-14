import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import forgotPassword from '@/features/auth/api/forgotPassword'
import Image from 'next/image'
import { useState } from 'react'

type ForgotPasswordFormProps = {
  guardType: 'user' | 'employee'
  onSuccess: () => void
}

export default function ForgotPasswordForm({ guardType, onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    forgotPassword({ guardType, email }).then(() => {
      onSuccess()
    })
  }

  return (
    <div className='w-96 rounded bg-white px-3 py-8 lg:p-12'>
      <div className='relative h-6 lg:w-full'>
        <Image src='/images/logo.svg' alt='ロゴ' fill />
      </div>
      <form className='mt-10 flex flex-col gap-5' onSubmit={handleSubmit}>
        <p>メールアドレスを入力してパスワード再設定用メールを受け取ってください。</p>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='メールアドレス'
          type='email'
        />
        <Button type='submit' className='w-full'>
          送信
        </Button>
      </form>
    </div>
  )
}
