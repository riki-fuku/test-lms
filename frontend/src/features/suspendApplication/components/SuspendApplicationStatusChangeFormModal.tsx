'use client'

import { Button, CautionList, Checkbox, DatePicker, Modal, Textarea } from '@/components/kit'
import { APPLICATION_RESULT_STATUS, APPLICATION_STATUS } from '@/features/applications/constants'
import {
  SelectApplicationResultStatus,
  SelectApplicationStatus,
} from '@/features/master/components'
import type { UpdateSuspendApplicationHttpDocument } from '@/features/suspendApplication/api'
import { updateSuspendApplication } from '@/features/suspendApplication/api'
import type { SuspendApplication } from '@/features/suspendApplication/types'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseDate } from '@internationalized/date'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  startDate: yup.string().required(),
  endDate: yup
    .string()
    .when('$isIndefinite', {
      is: false,
      then: (schema) => schema.required('休学期間を選択してください。'),
      otherwise: (schema) => schema.notRequired(),
    })
    .defined(),
  statusId: yup.number().required(),
  resultStatusId: yup
    .number()
    .when('statusId', {
      is: APPLICATION_STATUS.COMPLETED,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .defined(),
  changedReason: yup.string().trim().required('変更の理由を記入してください。'),
})

type FormValues = yup.InferType<typeof schema>

type Props = {
  workspaceId: string
  suspendApplication: Pick<
    SuspendApplication,
    | 'id'
    | 'startDate'
    | 'endDate'
    | 'status'
    | 'resultStatus'
    | 'user'
    | 'latestApplicationStatusLog'
  >
  isOpen: boolean
  onClose: () => void
}

export function SuspendApplicationStatusChangeFormModal({
  workspaceId,
  suspendApplication,
  isOpen,
  onClose,
}: Props) {
  const router = useRouter()
  const [isIndefinite, setIsIndefinite] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema, { context: { isIndefinite } }),
    defaultValues: {
      startDate: suspendApplication.startDate,
      endDate: suspendApplication.endDate ?? '',
      statusId: suspendApplication.status.value,
      resultStatusId: suspendApplication.resultStatus.value,
      changedReason: suspendApplication.latestApplicationStatusLog?.reason,
    },
  })

  const submit = async (data: FormValues) => {
    const finalEndDate = isIndefinite ? null : data.endDate

    const requestBody: UpdateSuspendApplicationHttpDocument['params']['requestBody'] = {
      start_date: data.startDate,
      end_date: finalEndDate,
      status_id: data.statusId,
      result_status_id: data.resultStatusId,
      changed_reason: data.changedReason,
    }

    // ステータスが完了でない場合、申請結果を更新対象から削除
    if (data.statusId !== APPLICATION_STATUS.COMPLETED) {
      delete requestBody.start_date
      delete requestBody.end_date
      delete requestBody.result_status_id
    }

    // 申請結果が承認でない場合、休学期間を更新対象から削除
    if (data.resultStatusId !== APPLICATION_RESULT_STATUS.ACCEPTED) {
      delete requestBody.start_date
      delete requestBody.end_date
    }

    await updateSuspendApplication(
      {
        pathParams: {
          workspaceId,
          suspendApplicationId: suspendApplication.id,
        },
        requestBody,
      },
      {
        callbacks: {
          onSuccess: () => {
            addToast({
              title: 'ステータスを変更しました',
              description: 'ステータスを変更しました',
              color: 'success',
            })
            router.refresh()
            onClose()
          },
          onError: (error: Error) => {
            addToast({
              title: 'ステータスを変更に失敗しました',
              description: 'もう一度お試しください',
              color: 'danger',
            })
            console.error(error)
          },
        },
      },
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(submit)}
      header={`${suspendApplication.user.fullName} 休学申請 内容変更`}
      body={
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold'>生徒名</h2>
          {suspendApplication.user.fullName}

          <h2 className='font-bold'>入力内容</h2>

          <label className='font-bold'>対応状況</label>
          <SelectApplicationStatus
            aria-label='status'
            selectedKeys={[String(watch('statusId'))]}
            onChange={(e) => {
              if (e.target.value) {
                setValue('statusId', Number(e.target.value))
              }
            }}
          />

          {watch('statusId') === APPLICATION_STATUS.COMPLETED && (
            <>
              <label className='font-bold'>申請結果</label>
              <SelectApplicationResultStatus
                aria-label='result-status'
                selectedKeys={[String(watch('resultStatusId'))]}
                onChange={(e) => {
                  if (e.target.value) {
                    setValue('resultStatusId', Number(e.target.value))
                  }
                }}
              />
            </>
          )}

          {watch('statusId') === APPLICATION_STATUS.COMPLETED &&
            watch('resultStatusId') === APPLICATION_RESULT_STATUS.ACCEPTED && (
              <>
                <div className='flex flex-col gap-2'>
                  <label className='font-bold'>休学期間</label>
                  <div className='flex gap-4'>
                    <DatePicker
                      aria-label='start-date'
                      value={watch('startDate') ? parseDate(watch('startDate')) : undefined}
                      onChange={(date) => {
                        setValue('startDate', date?.toString() ?? '')
                        trigger('startDate')
                      }}
                      maxValue={
                        watch('endDate') && /^\d{4}-\d{2}-\d{2}$/.test(watch('endDate'))
                          ? parseDate(watch('endDate'))
                          : undefined
                      }
                      className='w-full'
                    />
                    <DatePicker
                      aria-label='end-date'
                      value={watch('endDate') ? parseDate(watch('endDate')) : undefined}
                      onChange={(date) => {
                        setValue('endDate', date?.toString() ?? '')
                        trigger('endDate')
                      }}
                      minValue={parseDate(watch('startDate')).add({ days: 1 })}
                      isDisabled={isIndefinite}
                      className='w-full'
                    />
                  </div>
                </div>

                <Checkbox
                  aria-label='indefinite'
                  classNames={{ label: 'text-sm' }}
                  checked={isIndefinite}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    setIsIndefinite(isChecked)
                    if (isChecked) {
                      setValue('endDate', '')
                    }
                    trigger(['startDate', 'endDate'])
                  }}
                >
                  無期限
                </Checkbox>

                {errors.endDate?.message && (
                  <p className='text-sm text-red-500'>{errors.endDate.message}</p>
                )}
              </>
            )}

          <label className='font-bold'>理由</label>
          <Textarea
            aria-label='changed-reason'
            placeholder='変更の理由を記入してください'
            value={watch('changedReason')}
            onChange={(e) => {
              setValue('changedReason', e.target.value, { shouldValidate: true })
            }}
            isInvalid={!!errors.changedReason}
            errorMessage={errors.changedReason?.message}
          />

          <div className='text-xs [&_*]:!text-xs'>
            <CautionList
              title='確認事項'
              items={[
                '以下の注意点をしっかり確認してください。',
                'ステータスを変更した際、連動してトリガーが動く可能性があります。',
                'ステータス変更にかかるデータが保存されます。',
                'こちらのステータス変更でお間違えないですか？',
              ]}
            />
          </div>
        </div>
      }
      footer={() => (
        <div className='flex justify-end gap-2 pt-4'>
          <Button type='submit' className='bg-blue-600 text-white'>
            変更する
          </Button>
        </div>
      )}
    />
  )
}
