'use client'

import { Button, Textarea } from '@/components/kit'
import { ApplicationHeading } from '@/features/applications/components'
import {
  CoachChangeApplicationReserveSlotCalendar,
  ReasonRadioGroup,
} from '@/features/coachChangeApplication/components'
import { useCoachChangeFormStore } from '@/features/coachChangeApplication/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  reason: yup.string().required('コーチ変更をしたい理由を選択してください'),
  otherReason: yup
    .string()
    .when('reason', (reason) => {
      if (reason.includes('その他')) {
        return yup.string().required('詳細を入力してください')
      }
      return yup.string().notRequired()
    })
    .defined(),
  detailReason: yup.string().required('コーチ変更をしたい理由を入力してください'),
  interviewDate: yup.string().required('コーチ変更面談日を選択してください'),
  employeeId: yup.string().required('コーチ変更面談日を選択してください'),
})

export type FormValues = yup.InferType<typeof schema>

type Props = {
  onConfirm: () => void
  workspaceId: string
}

export function CoachChangeApplicationForm({ onConfirm, workspaceId }: Props) {
  const { formValues, setFormValues } = useCoachChangeFormStore()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: formValues,
  })

  const onSubmit = (data: FormValues) => {
    setFormValues(data)
    onConfirm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
      <Section>
        <ApplicationHeading title='コーチ変更を知ったきっかけ' required />
        <ReasonRadioGroup control={control} />
      </Section>

      <Section>
        <ApplicationHeading title='コーチ変更をしたい理由' required />
        <Textarea
          placeholder='コーチ変更をしたい理由を入力してください'
          value={watch('detailReason')}
          onChange={(e) => {
            setValue('detailReason', e.target.value)
            trigger('detailReason')
          }}
          defaultValue={formValues.detailReason}
          isInvalid={!!errors.detailReason}
          errorMessage={errors.detailReason?.message}
        />
      </Section>

      <Section>
        <ApplicationHeading title='コーチ変更面談日' required />
        <CoachChangeApplicationReserveSlotCalendar
          name='interviewDate'
          control={control}
          workspaceId={workspaceId}
        />
      </Section>

      <Button color='primary' type='submit' className='mx-auto block'>
        入力内容を確認する
      </Button>
    </form>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className='space-y-4'>{children}</section>
}
