'use client'

import { Button, DatePicker, Textarea } from '@/components/kit'
import { ApplicationHeading } from '@/features/applications/components'
import {
  ReasonRadioGroup,
  SuspendApplicationReserveSlotCalendar,
} from '@/features/suspendApplication/components'
import { useSuspendFormStore } from '@/features/suspendApplication/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseDate } from '@internationalized/date'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  reason: yup.string().required('休学をしたい理由を選択してください'),
  otherReason: yup
    .string()
    .when('reason', (reason) => {
      if (reason.includes('その他')) {
        return yup.string().required('詳細を入力してください')
      }
      return yup.string().notRequired()
    })
    .defined(),
  detailReason: yup.string().required('休学をしたい理由を入力してください'),
  preferredStartDate: yup
    .string()
    .required('休学開始希望日を選択してください')
    .test(
      'is-before-end-date',
      '開始日希望日は終了希望日以前の日付を選択してください',
      function (value) {
        const { endDate } = this.parent
        if (!endDate || !value) {
          return true
        }
        return value < endDate
      },
    ),
  preferredEndDate: yup
    .string()
    .required('休学終了希望日を選択してください')
    .test(
      'is-after-start-date',
      '終了希望日は開始希望日以降の日付を選択してください',
      function (value) {
        const { startDate } = this.parent
        if (!startDate || !value) {
          return true
        }
        return value > startDate
      },
    ),
  interviewDate: yup.string().required('休学面談日を選択してください'),
  employeeId: yup.string().required('休学面談日を選択してください'),
})

export type FormValues = yup.InferType<typeof schema>

type Props = {
  onConfirm: () => void
  workspaceId: string
}

export function SuspendApplicationForm({ onConfirm, workspaceId }: Props) {
  const { formValues, setFormValues } = useSuspendFormStore()

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
        <ApplicationHeading title='休学を知ったきっかけ' required />
        <ReasonRadioGroup control={control} />
      </Section>

      <Section>
        <ApplicationHeading title='休学をしたい理由' required />
        <Textarea
          aria-label='detailReason'
          placeholder='休学をしたい理由を入力してください'
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
        <ApplicationHeading title='休学開始希望日' required />
        <DatePicker
          aria-label='preferredStartDate'
          value={watch('preferredStartDate') ? parseDate(watch('preferredStartDate')) : undefined}
          onChange={(date) => {
            if (date) {
              setValue('preferredStartDate', date.toString())
              trigger('preferredStartDate')
            }
          }}
          isInvalid={!!errors.preferredStartDate}
          errorMessage={errors.preferredStartDate?.message}
        />
      </Section>

      <Section>
        <ApplicationHeading title='休学終了希望日' required />
        <DatePicker
          aria-label='preferredEndDate'
          value={watch('preferredEndDate') ? parseDate(watch('preferredEndDate')) : undefined}
          onChange={(date) => {
            if (date) {
              setValue('preferredEndDate', date.toString())
              trigger('preferredEndDate')
            }
          }}
          isInvalid={!!errors.preferredEndDate}
          errorMessage={errors.preferredEndDate?.message}
        />
      </Section>

      <Section>
        <ApplicationHeading title='休学面談日' required />
        <SuspendApplicationReserveSlotCalendar
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
