'use client'

import { Button, CautionList, Modal, Textarea } from '@/components/kit'
import { APPLICATION_STATUS } from '@/features/applications/constants'
import type { UpdateCancellationApplicationHttpDocument } from '@/features/cancellationApplication/api'
import { updateCancellationApplication } from '@/features/cancellationApplication/api'
import type { CancellationApplication } from '@/features/cancellationApplication/types'
import {
  SelectApplicationResultStatus,
  SelectApplicationStatus,
} from '@/features/master/components'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
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
  cancellationApplication: Pick<
    CancellationApplication,
    'id' | 'status' | 'resultStatus' | 'user' | 'latestApplicationStatusLog'
  >
  isOpen: boolean
  onClose: () => void
}

export function CancellationApplicationStatusChangeFormModal({
  workspaceId,
  cancellationApplication,
  isOpen,
  onClose,
}: Props) {
  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      statusId: cancellationApplication.status.value,
      resultStatusId: cancellationApplication.resultStatus.value,
      changedReason: cancellationApplication.latestApplicationStatusLog?.reason,
    },
  })

  const submit = async (data: FormValues) => {
    const requestBody: UpdateCancellationApplicationHttpDocument['params']['requestBody'] = {
      status_id: String(data.statusId),
      result_status_id: String(data.resultStatusId),
      changed_reason: data.changedReason,
    }

    // ステータスが完了でない場合、申請結果を更新対象から削除
    if (data.statusId !== APPLICATION_STATUS.COMPLETED) {
      delete requestBody.result_status_id
    }

    await updateCancellationApplication(
      {
        pathParams: {
          workspaceId,
          cancellationApplicationId: cancellationApplication.id,
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
      header={`${cancellationApplication.user.fullName} 解約申請 内容変更`}
      body={
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold'>生徒名</h2>
          {cancellationApplication.user.fullName}
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
