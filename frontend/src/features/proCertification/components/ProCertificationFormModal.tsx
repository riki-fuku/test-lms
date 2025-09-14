'use client'

import { Button, CautionList, DatePicker, Input, Modal } from '@/components/kit'
import { createProCertification, deleteProCertification } from '@/features/proCertification/api'
import type { ProCertification } from '@/features/proCertification/types'
import { addToast } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseDate } from '@internationalized/date'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

// 作成用スキーマ
const createSchema = yup.object({
  comment: yup.string().required('Pro変更理由を記入してください'),
  passedAt: yup
    .string()
    .required('Pro合格日を選択してください')
    .matches(/^[\d]{4}-[\d]{2}-[\d]{2}$/, '日付形式が不正です'),
})

// 削除用スキーマ
const deleteSchema = yup.object({
  comment: yup.string().required('Pro変更理由を記入してください'),
})

type FormValues = {
  comment: string
  passedAt?: string
}

type Props = {
  userName?: string
  proCertification?: Pick<ProCertification, 'id'> | null
  workspaceId: string
  userId: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function ProCertificationFormModal({
  userName,
  proCertification,
  workspaceId,
  userId,
  isOpen,
  onClose,
  onSuccess,
  onError,
}: Props) {
  const isPro = !!proCertification

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(isPro ? deleteSchema : createSchema),
    defaultValues: {
      comment: '',
      passedAt: '',
    },
  })

  // 共通の成功処理
  const handleSuccess = () => {
    addToast({
      title: '成功',
      description: 'Pro合格判定を更新しました',
      color: 'success',
    })
    handleClose()
    onSuccess?.()
  }

  // 共通のエラー処理
  const handleError = (error: unknown) => {
    addToast({
      title: 'エラー',
      description: 'Pro合格判定の更新に失敗しました',
      color: 'danger',
    })
    console.error('pro certification update failed:', error)
    onError?.(error)
  }

  // Pro合格判定の削除処理
  const handleDeleteProCertification = handleSubmit(async (data) => {
    if (!proCertification?.id) {
      return
    }

    try {
      await deleteProCertification({
        pathParams: { workspaceId, userId, proCertificationId: proCertification.id },
        requestBody: {
          comment: data.comment,
        },
      })
      handleSuccess()
    } catch (error) {
      handleError(error)
    }
  })

  // Pro合格判定の作成処理
  const handleCreateProCertification = handleSubmit(async (data) => {
    try {
      await createProCertification({
        pathParams: { workspaceId, userId },
        requestBody: {
          passed_at: data.passedAt,
          comment: data.comment,
        },
      })
      handleSuccess()
    } catch (error) {
      handleError(error)
    }
  })

  // フォーム送信処理の振り分け
  const submit = isPro ? handleDeleteProCertification : handleCreateProCertification

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={submit}
      size='xl'
      header={
        <div>
          <label className='pl-4 text-xl font-medium'>Pro合格判定の変更</label>
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

            <div className='mb-2 ml-2 flex gap-8'>
              <div className='flex-1'>
                <label className='mb-2 block text-sm'>{isPro ? '変更後' : '変更前'}</label>
                <Input value={isPro ? 'pro' : '-'} readOnly className='w-full' />
              </div>
              <span className='mb-2 self-end'>➔</span>
              <div className='flex-1'>
                <label className='mb-2 block text-sm'>{isPro ? '変更前' : '変更後'}</label>
                <Input value={isPro ? '-' : 'Pro'} readOnly className='w-full' />
              </div>
            </div>

            {!isPro && (
              <div className='mb-2 ml-2'>
                <label className='mb-2 block text-sm'>Pro合格日</label>
                <DatePicker
                  className='w-1/2'
                  value={watch('passedAt') ? parseDate(watch('passedAt') as string) : null}
                  onChange={(date) => {
                    setValue('passedAt', date ? date.toString() : '', { shouldValidate: true })
                  }}
                  aria-label='Pro合格日'
                  isInvalid={!!errors.passedAt}
                  errorMessage={errors.passedAt?.message}
                />
              </div>
            )}
            <div className='ml-2'>
              <label className='mb-2 block text-sm'>Pro変更理由</label>
              <textarea
                value={watch('comment')}
                onChange={(e) => {
                  setValue('comment', e.target.value, { shouldValidate: true })
                }}
                placeholder='コメントを入力してください'
                className='h-24 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-transparent focus:outline-none focus:ring'
              />
              {errors.comment && (
                <p className='mt-1 text-sm text-red-600'>{errors.comment.message}</p>
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
          <Button type='submit' color='primary'>
            変更する
          </Button>
        </div>
      )}
    />
  )
}
