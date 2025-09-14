import { Button, ToggleCard } from '@/components/kit'
import { APPLICATION_STATUS, APPLICATION_TYPE } from '@/features/applications/constants'
import { useFetchApplicationsByUserId } from '@/features/applications/hooks'
import type { ApplicationByUser } from '@/features/applications/types'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

type Props = {
  title: string
  className?: string
}

export function ApplicationCardListToggleCard({ title, className }: Props) {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const userId = user?.id ?? ''
  const router = useRouter()
  const { data, error, isLoading } = useFetchApplicationsByUserId(workspaceId, userId)
  const applications = data?.data ?? []

  const navigateToApplicationDetail = (application: ApplicationByUser) => {
    switch (application.applicationType.id) {
      case APPLICATION_TYPE.SUSPEND_APPLICATION:
        router.push(`/renewal/user/${workspaceId}/applications/suspend/${application.id}`)
        break
      case APPLICATION_TYPE.CANCELLATION_APPLICATION:
        router.push(`/renewal/user/${workspaceId}/applications/cancellation/${application.id}`)
        break
      case APPLICATION_TYPE.COACH_CHANGE_APPLICATION:
        router.push(`/renewal/user/${workspaceId}/applications/coach-change/${application.id}`)
        break
      default:
        console.warn('Unknown application type:', application.applicationType.id)
    }
  }

  return (
    <ToggleCard title={title} className={`${className} px-0`}>
      {isLoading && (
        <div className='flex justify-center p-4'>
          <div>読み込み中...</div>
        </div>
      )}

      {error && (
        <div className='flex justify-center p-4'>
          <div className='text-red-500'>申請データの取得に失敗しました</div>
        </div>
      )}

      {!isLoading && !error && applications.length > 0 && (
        <div className='flex max-h-80 flex-col gap-4 overflow-y-auto px-2'>
          {applications.map((application: ApplicationByUser) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDetailClick={navigateToApplicationDetail}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && applications.length === 0 && (
        <div className='flex justify-center p-4'>
          <div className='text-gray-500'>申請がありません。</div>
        </div>
      )}
    </ToggleCard>
  )
}

function ApplicationCard({
  application,
  onDetailClick,
}: {
  application: ApplicationByUser
  onDetailClick: (application: ApplicationByUser) => void
}) {
  return (
    <div className='flex justify-between rounded-lg bg-bg-secondary p-4'>
      <div>
        <div className='flex gap-4'>
          <h2 className='text-sm font-bold'>{application.applicationType.label}</h2>
          <Label status={application.status} />
        </div>
        <p className='text-sm font-bold text-gray-500'>
          {application.interviewDatetime &&
            `面談日：${dayjs(application.interviewDatetime).format('YYYY年MM月DD日 HH:mm')}〜`}
        </p>
      </div>

      <Button size='sm' color='primary' onPress={() => onDetailClick(application)}>
        詳細
      </Button>
    </div>
  )
}

function Label({
  status,
}: {
  status: {
    id: number
    label: string
  }
}) {
  const color = useMemo(() => {
    switch (status.id) {
      case APPLICATION_STATUS.PENDING:
        return 'text-blue-500'
      case APPLICATION_STATUS.RESCHEDULING:
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }, [status.id])

  return <p className={`${color} text-sm font-bold`}>{status.label}</p>
}
