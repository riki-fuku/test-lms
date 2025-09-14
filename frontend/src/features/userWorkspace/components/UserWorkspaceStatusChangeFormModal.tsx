'use client'

import { Button, CautionList, Input, Modal } from '@/components/kit'
import { SelectUserWorkspaceStatus } from '@/features/master/components'
import { updateUserWorkspaceStatus } from '@/features/userWorkspace/api'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  statusId: yup.number().required('変更後の受講状態を選択してください'),
  changedReason: yup.string().required('変更理由を記入してください'),
})

type FormValues = yup.InferType<typeof schema>

type Props = {
  isOpen: boolean
  onClose: () => void
  userName?: string
  currentStatusLabel?: string
  workspaceId: string
  userId: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function UserWorkspaceStatusChangeFormModal({
  isOpen,
  onClose,
  userName,
  currentStatusLabel,
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
      changedReason: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUserWorkspaceStatus({
        pathParams: { workspaceId, userId },
        requestBody: {
          status_id: data.statusId,
          changed_reason: data.changedReason,
        },
      })
      // 成功時のトースト
      addToast({
        title: '成功',
        description: '受講状態を変更しました',
        color: 'success',
      })
      handleClose()
      onSuccess?.()
    } catch (error) {
      // 失敗時のトースト
      addToast({
        title: 'エラー',
        description: '受講状態の変更に失敗しました',
        color: 'danger',
      })
      console.error('Status change failed:', error)
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
          <label className='pl-4 text-xl font-medium'>受講状態の変更</label>
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
              <Input value={currentStatusLabel || '-'} readOnly className='w-1/2' />
            </div>

            <div className='mb-2 ml-2'>
              <label className='mb-2 block text-sm'>変更後</label>
              <SelectUserWorkspaceStatus
                placeholder='選択'
                selectedKeys={watch('statusId') ? [String(watch('statusId'))] : []}
                onChange={(e) => {
                  setValue('statusId', Number(e.target.value))
                }}
                className='w-1/2'
                aria-label='変更後の受講状態を選択'
              />
              {errors.statusId && (
                <p className='mt-1 text-sm text-red-600'>{errors.statusId.message}</p>
              )}
            </div>

            <div className='ml-2'>
              <label className='mb-2 block text-sm'>変更理由</label>
              <textarea
                value={watch('changedReason')}
                onChange={(e) => {
                  setValue('changedReason', e.target.value)
                }}
                placeholder='コメントを入力してください'
                className='h-24 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-transparent focus:outline-none focus:ring'
              />
              {errors.changedReason && (
                <p className='mt-1 text-sm text-red-600'>{errors.changedReason.message}</p>
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
