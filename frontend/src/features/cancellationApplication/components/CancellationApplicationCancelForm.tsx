'use client'

import { Button, CautionList, Checkbox, Textarea } from '@/components/kit'
import { ApplicationHeading } from '@/features/applications/components'
import { APPLICATION_RESULT_STATUS, APPLICATION_STATUS } from '@/features/applications/constants'
import { updateCancellationApplication } from '@/features/cancellationApplication/api'
import { useAsyncSafeAction } from '@/hooks/useAsyncSafeAction'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  cancelReason: yup.string().required('申請をキャンセルしたい理由を記入してください'),
  isConfirmed: yup
    .boolean()
    .default(false)
    .oneOf([true], '上記の内容を確認し、チェックを入れてください'),
})

export type CancelFormValues = yup.InferType<typeof schema>

type Props = {
  onBack: () => void
  onCancel?: () => void
  workspaceId: string
  cancellationApplicationId: string
}

export function CancellationApplicationCancelForm({
  onBack,
  onCancel,
  workspaceId,
  cancellationApplicationId,
}: Props) {
  const router = useRouter()
  const [isRequestComplete, setIsRequestComplete] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<CancelFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      cancelReason: '',
      isConfirmed: false,
    },
  })

  const [execute, isLoading] = useAsyncSafeAction(async () => {
    const requestData = {
      pathParams: { workspaceId, cancellationApplicationId },
      requestBody: {
        status_id: String(APPLICATION_STATUS.COMPLETED),
        result_status_id: String(APPLICATION_RESULT_STATUS.CANCELLED),
        changed_reason: watch('cancelReason'),
      },
    }

    await updateCancellationApplication(requestData, {
      callbacks: {
        onSuccess: () => {
          addToast({
            title: 'キャンセルが完了しました',
            description: '解約申請をキャンセルしました',
            color: 'success',
          })
          setIsRequestComplete(true)
          router.push(`/renewal/user/${workspaceId}/dashboard`)
          onCancel?.()
        },
        onError: () => {
          addToast({
            title: 'キャンセルに失敗しました',
            description: 'もう一度お試しください',
            color: 'danger',
          })
        },
      },
    })
  })

  const onSubmit = async (_data: CancelFormValues) => {
    execute()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
      <Section>
        <ApplicationHeading title='キャンセル理由' required />
        <Textarea
          aria-label='cancelReason'
          placeholder='申請をキャンセルしたい理由を教えてください'
          value={watch('cancelReason')}
          onChange={(e) => {
            setValue('cancelReason', e.target.value)
            trigger('cancelReason')
          }}
          isInvalid={!!errors.cancelReason}
          errorMessage={errors.cancelReason?.message}
        />
      </Section>

      <Section>
        <CautionList
          title='確認事項'
          items={[
            'キャンセル後の変更はできません。キャンセル後に再申請をご希望の場合は、再度申請を行っていただく必要があります。',
            'キャンセルの内容は、運営側でも確認できるように記録しています。',
          ]}
        />
      </Section>

      <Section>
        <div className='flex justify-center font-bold'>
          <Checkbox
            isSelected={watch('isConfirmed')}
            onValueChange={(checked) => {
              setValue('isConfirmed', checked)
              trigger('isConfirmed')
            }}
          >
            上記の内容を確認しました。
          </Checkbox>
        </div>
        {errors.isConfirmed && (
          <p className='mt-1 text-center text-sm text-danger'>{errors.isConfirmed.message}</p>
        )}
      </Section>

      <div className='flex justify-center gap-4'>
        <Button color='default' variant='bordered' onPress={onBack}>
          詳細画面に戻る
        </Button>
        <Button
          color='primary'
          type='submit'
          isLoading={isLoading}
          isDisabled={isLoading || isRequestComplete}
        >
          キャンセルする
        </Button>
      </div>
    </form>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className='space-y-4'>{children}</section>
}
