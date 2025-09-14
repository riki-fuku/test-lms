'use client'
import { Button, Divider } from '@/components/kit'
import { APPLICATION_RESULT_STATUS, APPLICATION_STATUS } from '@/features/applications/constants'
import type { SuspendApplication } from '@/features/suspendApplication/types'
import useDateTools from '@/hooks/useDateTools'

type Props = {
  suspendApplication: Pick<
    SuspendApplication,
    | 'id'
    | 'workspaceId'
    | 'preferredStartDate'
    | 'preferredEndDate'
    | 'startDate'
    | 'endDate'
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

export function SuspendApplicationInfo({ suspendApplication, accountType }: Props) {
  const {
    id,
    workspaceId,
    preferredStartDate,
    preferredEndDate,
    startDate,
    endDate,
    status,
    resultStatus,
    reason,
    reasonDetail,
    employee,
    latestApplicationInterview,
    latestApplicationStatusLog,
  } = suspendApplication
  const { formatDate } = useDateTools()
  const formattedPreferredStartDate = formatDate(preferredStartDate, 'YYYY/MM/DD')
  const formattedPreferredEndDate = preferredEndDate && formatDate(preferredEndDate, 'YYYY/MM/DD')
  const formattedStartDate = formatDate(startDate, 'YYYY/MM/DD')
  const formattedEndDate = (endDate && formatDate(endDate, 'YYYY/MM/DD')) || '-'
  const interviewDatetime =
    (latestApplicationInterview &&
      formatDate(latestApplicationInterview.interviewDatetime, 'YYYY/MM/DD HH:mm')) ||
    '-'
  const result = isCompletedStatus(status.value) ? resultStatus.label : '-'
  const period =
    isCompletedStatus(status.value) && isAcceptedStatus(resultStatus.value)
      ? `${formattedStartDate} 〜 ${formattedEndDate}`
      : '-'
  const statusChangedReason = latestApplicationStatusLog?.reason || '-'

  function isPendingStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.PENDING
  }

  function isRescheduleStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.RESCHEDULING
  }

  function isCompletedStatus(statusId: number) {
    return statusId === APPLICATION_STATUS.COMPLETED
  }

  function isAcceptedStatus(statusId: number) {
    return statusId === APPLICATION_RESULT_STATUS.ACCEPTED
  }

  return (
    <div className='flex flex-col gap-8'>
      <section>
        <h2 className='mb-2 text-2xl font-bold'>申請内容</h2>
        <div className='mb-4 w-full border-b border-gray-200' />
        <table className='min-w-full'>
          <tbody>
            <tr>
              <th className='w-36 p-2 text-left'>休学を知った理由</th>
              <td className='p-2 pl-6'>{reason}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>休学をしたい理由</th>
              <td className='p-2 pl-6'>{reasonDetail}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>休学開始希望日</th>
              <td className='p-2 pl-6'>{formattedPreferredStartDate}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>休学終了希望日</th>
              <td className='p-2 pl-6'>{formattedPreferredEndDate}</td>
            </tr>
            <tr>
              <th className='w-36 p-2 text-left'>休学面談日</th>
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
                        href={`/renewal/user/${workspaceId}/applications/suspend/${id}/reschedule`}
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
              <th className='w-36 p-2 text-left'>休学期間</th>
              <td className='p-2 pl-6'>{period}</td>
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
