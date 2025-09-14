import Button from '@/components/ui/Button'
import bulkUpdateQuestionsStatus from '@/features/questions/api/bulkUpdateQuestionsStatus'
import SideLayout from '@/features/questions/components/SideLayout'
import TagLabel from '@/features/questions/components/TagLabel'
import type { ManageAnswerStats } from '@/features/questions/types/ManageAnswerStats'
import { UNHANDLED } from '@/features/questions/types/QuestionStatus'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useEmployeeStore } from '@/store/employee-store'
import { useState } from 'react'

type ManageIndexSideProps = {
  workspaceId: string
  className?: string
  onUpdateQuestion: () => void
}

export default function ManageIndexSide({
  workspaceId,
  className,
  onUpdateQuestion,
}: ManageIndexSideProps) {
  const { showSnackbar } = useSnackbar()
  const loginEmployee = useEmployeeStore((state) => state.employee)
  const [answerStats, setAnswerStats] = useState<ManageAnswerStats | null>()

  const bulkUpdateStatus = async (status: number) => {
    if (!loginEmployee) return
    try {
      await bulkUpdateQuestionsStatus(workspaceId, {
        status,
        filter: {
          questionResponderId: loginEmployee.id,
        },
      })
      onUpdateQuestion()
      showSnackbar('ステータスを変更しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('ステータスを変更できませんでした', 'error')
    }
  }

  return (
    <SideLayout className={className}>
      <div className='flex flex-col gap-8'>
        {answerStats && (
          <div className='flex flex-col gap-2.5'>
            <p className='border-grey-tertiary mb-5 border-b py-2.5'>回答リスト</p>
            <div className='flex flex-col gap-2.5'>
              <div className='flex justify-between border-b text-sm'>
                <p>回答数合計</p>
                <p>{answerStats.answerTotal}</p>
              </div>
              <div className='ml-2.5 flex flex-col gap-2.5'>
                <div className='flex justify-between text-sm'>
                  <p>今日</p>
                  <p>{answerStats.answerCount.today}</p>
                </div>
                <div className='flex justify-between text-sm'>
                  <p>今週</p>
                  <p>{answerStats.answerCount.week}</p>
                </div>
                <div className='flex justify-between text-sm'>
                  <p>今月</p>
                  <p>{answerStats.answerCount.month}</p>
                </div>
              </div>

              <div className='flex justify-between border-b text-sm'>
                <p>ベストアンサー合計</p>
                <p>{answerStats.bestAnswerTotal}</p>
              </div>
              <div className='ml-2.5 flex justify-between text-sm'>
                <p>今月</p>
                <p>{answerStats.bestAnswerCount.month}</p>
              </div>

              {/* <div className='flex justify-between border-b text-sm'>
                <p>総いいね計</p>
                <p>{answerStats.good_total}</p>
              </div>
              <div className='ml-2.5 flex justify-between text-sm'>
                <p>今月</p>
                <p>{answerStats.good_count.month}</p>
              </div> */}
            </div>
          </div>
        )}
        <div>
          <p className='border-grey-tertiary mb-5 border-b py-2.5'>回答可能範囲</p>
          <div className='flex flex-wrap gap-2.5'>
            {answerStats?.availableTags.map((tag, index) => (
              <TagLabel key={index} label={tag.name} />
            ))}
          </div>
        </div>
        <Button intent='secondary' className='h-12' onClick={() => bulkUpdateStatus(UNHANDLED)}>
          担当を全て外す
        </Button>
      </div>
    </SideLayout>
  )
}
