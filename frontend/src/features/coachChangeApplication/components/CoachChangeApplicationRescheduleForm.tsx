'use client'

import { Button, CautionList, Checkbox } from '@/components/kit'
import { ApplicationHeading } from '@/features/applications/components'
import { rescheduleCoachChangeApplication } from '@/features/coachChangeApplication/api'
import { CoachChangeApplicationReserveSlotCalendar } from '@/features/coachChangeApplication/components'
import { useAsyncSafeAction } from '@/hooks/useAsyncSafeAction'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  interviewDate: yup.string().required('コーチ変更面談日を選択してください'),
  isConfirmed: yup
    .boolean()
    .default(false)
    .oneOf([true], '上記の内容を確認し、チェックを入れてください'),
})

export type RescheduleFormValues = yup.InferType<typeof schema>

type Props = {
  workspaceId: string
  coachChangeApplicationId: string
}

export function CoachChangeApplicationRescheduleForm({
  workspaceId,
  coachChangeApplicationId,
}: Props) {
  const router = useRouter()
  const [isRequestComplete, setIsRequestComplete] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<RescheduleFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      interviewDate: '',
      isConfirmed: false,
    },
  })

  const [execute, isLoading] = useAsyncSafeAction(async () => {
    const requestData = {
      pathParams: { workspaceId, coachChangeApplicationId },
      requestBody: {
        interview_datetime: watch('interviewDate'),
      },
    }

    await rescheduleCoachChangeApplication(requestData, {
      callbacks: {
        onSuccess: () => {
          addToast({
            title: '再日程調整が完了しました',
            description: 'コーチ変更申請の再日程調整が完了しました',
            color: 'success',
          })
          setIsRequestComplete(true)
          router.push(
            `/renewal/user/${workspaceId}/applications/coach-change/${coachChangeApplicationId}`,
          )
        },
        onError: () => {
          addToast({
            title: '再日程調整に失敗しました',
            description: 'もう一度お試しください',
            color: 'danger',
          })
        },
      },
    })
  })

  const onSubmit = () => {
    execute()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
      <Section>
        <ApplicationHeading title='コーチ変更面談日' required />
        <CoachChangeApplicationReserveSlotCalendar
          name='interviewDate'
          control={control}
          workspaceId={workspaceId}
        />
      </Section>

      <Section>
        <CautionList
          title='確認事項'
          items={[
            '日程確定後の変更はできません。ご自身の入力した内容にお間違いがないかの確認をしてください。',
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

      <Button
        color='primary'
        type='submit'
        className='mx-auto block'
        isLoading={isLoading}
        isDisabled={isLoading || isRequestComplete}
      >
        送信する
      </Button>
    </form>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className='space-y-4'>{children}</section>
}
