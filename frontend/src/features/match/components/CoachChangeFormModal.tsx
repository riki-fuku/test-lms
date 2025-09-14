'use client'

import { Button, CautionList, Input, Modal } from '@/components/kit'
import { AutocompleteEmployees } from '@/features/employee/components'
import { EmployeeRole } from '@/features/employee/constants'
import { createMatch } from '@/features/match/api'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  newEmployeeId: yup.string().required('変更後のコーチを選択してください'),
  reason: yup.string().required('変更理由を記入してください'),
})

type FormValues = yup.InferType<typeof schema>

type Props = {
  isOpen: boolean
  onClose: () => void
  userName?: string
  currentEmployee?: string
  workspaceId: string
  userId: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function CoachChangeFormModal({
  isOpen,
  onClose,
  userName,
  currentEmployee,
  workspaceId,
  userId,
  onSuccess,
  onError,
}: Props) {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      reason: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await createMatch({
        pathParams: { workspaceId },
        requestBody: {
          employee_id: data.newEmployeeId,
          user_id: userId,
          reason: data.reason,
        },
      })
      // 成功時のトースト
      addToast({
        title: '成功',
        description: '担当コーチを変更しました',
        color: 'success',
      })
      handleClose()
      onSuccess?.()
    } catch (error) {
      // 失敗時のトースト
      addToast({
        title: 'エラー',
        description: '担当コーチの変更に失敗しました',
        color: 'danger',
      })
      console.error('Coach change failed:', error)
      onError?.(error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='xl'
      header={
        <div>
          <label className='pl-4 text-xl font-medium'>担当コーチの変更</label>
        </div>
      }
      body={
        <div className='p-4'>
          <div>
            <label className='mb-1 block text-base font-medium'>生徒名</label>
            <div className='mb-2 ml-2 text-base'>{userName || '-'}</div>
          </div>

          <div>
            <label className='mb-1 block text-base font-medium'>変更内容</label>

            <div className='mb-2 ml-2'>
              <label className='mb-2 block text-sm'>変更前</label>
              <Input value={currentEmployee || '-'} readOnly className='w-1/2' />
            </div>

            <div className='mb-2 ml-2'>
              <label className='mb-2 block text-sm'>変更後</label>
              <AutocompleteEmployees
                workspaceId={workspaceId}
                type={EmployeeRole.COACH}
                placeholder='選択'
                selectedKey={watch('newEmployeeId') ?? null}
                onSelectionChange={(key) => {
                  setValue('newEmployeeId', key as string)
                }}
                className='w-1/2'
                aria-label='変更後の担当コーチを選択'
              />
              {errors.newEmployeeId && (
                <p className='mt-1 text-sm text-red-600'>{errors.newEmployeeId.message}</p>
              )}
            </div>

            <div className='ml-2'>
              <label className='mb-2 block text-sm'>変更理由</label>
              <textarea
                value={watch('reason') ?? ''}
                onChange={(e) => {
                  setValue('reason', e.target.value)
                }}
                placeholder='コメントを入力してください'
                className='h-24 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-transparent focus:outline-none focus:ring'
              />
              {errors.reason && (
                <p className='mt-1 text-sm text-red-600'>{errors.reason.message}</p>
              )}
            </div>
          </div>

          <div className='ml-2'>
            <CautionList
              title='確認事項'
              items={[
                'ステータスを変更した際、連動してトリガーが動く可能性があります。',
                'ステータス変更にかかるデータが保存されます。',
              ]}
            />
          </div>
        </div>
      }
      footer={() => (
        <div className='flex justify-end pr-4'>
          <Button color='primary' onPress={() => handleSubmit(onSubmit)()}>
            変更する
          </Button>
        </div>
      )}
    />
  )
}
