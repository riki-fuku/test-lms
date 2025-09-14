import { Button, Divider } from '@/components/kit'
import { APPLICATION_STATUS } from '@/features/applications/constants'
import type { CoachChangeApplication } from '@/features/coachChangeApplication/types'
import useDateTools from '@/hooks/useDateTools'

type Props = {
  coachChangeApplication: Pick<
    CoachChangeApplication,
    | 'id'
    | 'workspaceId'
    | 'status'
    | 'resultStatus'
    | 'reason'
    | 'reasonDetail'
    | 'employee'
    | 'latestApplicationInterview'
    | 'latestApplicationStatusLog'
  >
  accountType: 'user' | 'cs' | 'admin'
}

export function CoachChangeApplicationInfo({ coachChangeApplication, accountType }: Props) {
  const {
    id,
    workspaceId,
    status,
    resultStatus,
    reason,
    reasonDetail,
    employee,
    latestApplicationInterview,
    latestApplicationStatusLog,
  } = coachChangeApplication
  const { formatDate } = useDateTools()
  const interviewDatetime =
    (latestApplicationInterview &&
      formatDate(latestApplicationInterview.interviewDatetime, 'YYYY/MM/DD HH:mm')) ||
    '-'
  const result = isCompletedStatus(status.value) ? resultStatus.label : '-'
  const statusChangedReason = isPendingStatus(status.value)
    ? '-'
    : latestApplicationStatusLog?.reason

  function isPendingStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.PENDING
  }

  function isRescheduleStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.RESCHEDULING
  }

  function isCompletedStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.COMPLETED
  }

  return (
    <div className='flex flex-col gap-8'>
      <section>
        <h2 className='mb-2 text-2xl font-bold'>申請内容</h2>
        <div className='mb-4 w-full border-b border-gray-200' />
        <table className='min-w-full'>
          <tbody>
            <tr>
              <th className='w-36 p-2 text-left'>コーチ変更を知った理由</th>
              <td className='p-2 pl-6'>{reason}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>コーチ変更をしたい理由</th>
              <td className='p-2 pl-6'>{reasonDetail}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>コーチ変更面談日</th>
              <td className='p-2 pl-6'>
                {interviewDatetime}
                {isRescheduleStatus(status.value) && accountType === 'user' && (
                  <span className='text-red-600'>&nbsp;※面談再日程調節をしてください。</span>
                )}
              </td>
            </tr>
            {accountType === 'user' && (
              <tr>
                <td colSpan={2} className='pt-2'>
                  <div className='flex justify-end'>
                    {isRescheduleStatus(status.value) && (
                      <Button
                        color='primary'
                        as='a'
                        href={`/renewal/user/${workspaceId}/applications/coach-change/${id}/reschedule`}
                      >
                        再日程調整
                      </Button>
                    )}
                    {isPendingStatus(status.value) &&
                      (latestApplicationInterview?.interviewUrl ? (
                        <Button
                          color='primary'
                          as='a'
                          href={latestApplicationInterview.interviewUrl}
                        >
                          面談に参加する
                        </Button>
                      ) : (
                        <span className='text-gray-500'>面談のリンクがありません</span>
                      ))}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Divider />
      <section>
        <h2 className='mb-2 text-2xl font-bold'>申請状況</h2>
        <div className='mb-4 w-full border-b border-gray-200' />
        <table className='min-w-full'>
          <tbody>
            <tr>
              <th className='w-36 p-2 text-left'>面談対応者</th>
              <td className='p-2 pl-6'>{employee.fullName}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>対応状況</th>
              <td className='p-2 pl-6'>{status.label}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>申請結果</th>
              <td className='p-2 pl-6'>{result}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>理由</th>
              <td className='p-2 pl-6'>{statusChangedReason}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
