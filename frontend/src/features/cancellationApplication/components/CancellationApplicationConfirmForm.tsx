'use client'

import { Button, Textarea } from '@/components/kit'
import { ApplicationHeading } from '@/features/applications/components'

import { createCancellationApplication } from '@/features/cancellationApplication/api'
import { useCancellationFormStore } from '@/features/cancellationApplication/store'
import { useAsyncSafeAction } from '@/hooks/useAsyncSafeAction'
import useDateTools from '@/hooks/useDateTools'
import { useActorStore } from '@/store/actor-store'
import { addToast } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  onBack: () => void
  workspaceId: string
}

export function CancellationApplicationConfirmForm({ onBack, workspaceId }: Props) {
  const actor = useActorStore((state) => state.actor)
  const router = useRouter()
  const { formatDate } = useDateTools()
  const {
    formValues: { reason, otherReason, detailReason, interviewDate, employeeId },
  } = useCancellationFormStore()

  if (!actor || !('id' in actor)) {
    throw new Error('ユーザー情報が取得できません')
  }

  // 解約申請送信
  const [isRequestComplete, setIsRequestComplete] = useState(false)
  const [execute, isLoading] = useAsyncSafeAction(async () => {
    await createCancellationApplication(
      {
        pathParams: { workspaceId },
        requestBody: {
          user_id: actor.id,
          employee_id: employeeId,
          reason: reason === 'その他' ? 'その他：' + otherReason : reason,
          reason_detail: detailReason,
          interview_datetime: interviewDate,
        },
      },
      {
        callbacks: {
          onSuccess: () => {
            addToast({
              title: '申請が完了しました',
              description: '解約申請を送信しました',
              color: 'success',
            })
            setIsRequestComplete(true)
            router.push(`/renewal/${workspaceId}/help`)
          },
          onError: () => {
            addToast({
              title: '申請に失敗しました',
              description: 'もう一度お試しください',
              color: 'danger',
            })
          },
        },
      },
    )
  })
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    execute()
  }

  return (
    <form onSubmit={onSubmit} className='space-y-10'>
      <Section>
        <ApplicationHeading title='解約を知ったきっかけ' required />
        <p>
          {reason}
          {reason === 'その他' && `：${otherReason}`}
        </p>
      </Section>

      <Section>
        <ApplicationHeading title='解約をしたい理由' required />
        <Textarea placeholder='解約をしたい理由を入力してください' value={detailReason} disabled />
      </Section>

      <Section>
        <ApplicationHeading title='解約面談日' required />
        <p className='rounded bg-bg-secondary py-8 text-center text-xl font-bold'>
          {formatDate(interviewDate, 'YYYY年MM月DD日 (ddd) HH:mm~')}
        </p>
      </Section>

      <div className='flex justify-center gap-4'>
        <Button variant='bordered' size='lg' onPress={onBack}>
          入力画面に戻る
        </Button>
        <Button
          color='primary'
          type='submit'
          size='lg'
          isLoading={isLoading}
          isDisabled={isLoading || isRequestComplete}
        >
          送信する
        </Button>
      </div>
    </form>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className='space-y-4'>{children}</section>
}
