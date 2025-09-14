'use client'

import { CautionList, Modal } from '@/components/kit'
import type { ApplicationInterviewEmployeeByApplication } from '@/features/applicationInterviewEmployee/api'
import {
  createApplicationInterviewEmployee,
  destroyApplicationInterviewEmployeeByEmployee,
} from '@/features/applicationInterviewEmployee/api'
import type { APPLICATION_TYPE } from '@/features/applications/constants'
import { useMasterContext } from '@/features/master/providers'
import { Button, addToast } from '@heroui/react'
import { HiArrowRight } from 'react-icons/hi'

export type ApplicationInterviewEmployeeToggleActiveModalProps = {
  workspaceId: string
  applicationTypeId: APPLICATION_TYPE
  applicationInterviewEmployee: ApplicationInterviewEmployeeByApplication
  isOpen: boolean
  onClose: () => void
  onEnableSuccess?: () => void
  onDisableSuccess?: () => void
}

export function ApplicationInterviewEmployeeToggleActiveModal({
  workspaceId,
  applicationTypeId,
  applicationInterviewEmployee,
  isOpen,
  onClose,
  onEnableSuccess,
  onDisableSuccess,
}: ApplicationInterviewEmployeeToggleActiveModalProps) {
  const {
    masters: { application_types },
  } = useMasterContext()

  const enable = async (
    applicationInterviewEmployee: ApplicationInterviewEmployeeByApplication,
  ) => {
    await createApplicationInterviewEmployee(
      {
        pathParams: {
          workspaceId,
        },
        requestBody: {
          application_type_id: applicationTypeId,
          employee_id: applicationInterviewEmployee.employee.id,
        },
      },
      {
        callbacks: {
          onSuccess: () => {
            addToast({
              title: '有効化しました',
              description: '有効化しました',
              color: 'success',
            })
          },
          onError: () => {
            addToast({
              title: '有効化に失敗しました',
              description: '有効化に失敗しました',
              color: 'danger',
            })
          },
        },
      },
    )
  }

  const disable = async (
    applicationInterviewEmployee: ApplicationInterviewEmployeeByApplication,
  ) => {
    await destroyApplicationInterviewEmployeeByEmployee(
      {
        pathParams: {
          workspaceId,
          employeeId: applicationInterviewEmployee.employee.id,
        },
        queryParams: {
          application_type_ids: [applicationTypeId],
        },
      },
      {
        callbacks: {
          onSuccess: () => {
            addToast({
              title: '無効化しました',
              description: '無効化しました',
              color: 'success',
            })
          },
          onError: () => {
            addToast({
              title: '無効化に失敗しました',
              description: '無効化に失敗しました',
              color: 'danger',
            })
          },
        },
      },
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (e) => {
        e.preventDefault()

        if (applicationInterviewEmployee.enabled) {
          await disable(applicationInterviewEmployee)
          onDisableSuccess?.()
        } else {
          await enable(applicationInterviewEmployee)
          onEnableSuccess?.()
        }
      }}
      header={`${
        application_types.find((type) => type.value === applicationTypeId)?.label
      } カレンダー有効化切り替え`}
      body={
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-xl font-bold'>氏名</label>
            <p className='ml-4 text-lg'>{applicationInterviewEmployee.employee.fullName}</p>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-bold'>変更内容</label>
            <div className='ml-4 flex items-center gap-6'>
              <div>
                <label className='font-bold'>変更前</label>
                <p>{applicationInterviewEmployee.enabled ? 'オン' : 'オフ'}</p>
              </div>
              <HiArrowRight className='size-4' />
              <div>
                <label className='font-bold'>変更後</label>
                <p>{applicationInterviewEmployee.enabled ? 'オフ' : 'オン'}</p>
              </div>
            </div>
          </div>

          <CautionList
            title='確認事項'
            items={[
              'ステータスを変更した際、連動してトリガーが動く可能性があります。',
              'ステータス変更にかかるデータが保存されます。',
            ]}
          />
        </div>
      }
      footer={() => (
        <div className='flex justify-end'>
          <Button type='submit' color='primary'>
            切り替える
          </Button>
        </div>
      )}
    />
  )
}
