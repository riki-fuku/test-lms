import Button from '@/components/ui/Button'
import type { ReasonType } from '@/features/applications/components/Reason'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'

type CoachChangeConfirmProps = {
  reason: ReasonType
  selectDate: Date
  requestMessage: string
  className?: string
  otherReason?: string
  askMessage?: string
  isCreating: boolean
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function CoachChangeConfirm({
  className,
  reason,
  otherReason,
  requestMessage,
  askMessage,
  selectDate,
  isCreating,
  onBack,
  onSubmit,
}: CoachChangeConfirmProps) {
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBack(e)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isCreating) onSubmit(e)
  }

  const Item = ({ title, text }: { title: string; text: string | undefined }) => {
    return (
      <div className='flex flex-col gap-2'>
        <label className='font-bold'>{title}</label>
        <p className={cn(!text && 'text-text-secondary')}>{text ? text : '未入力'}</p>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-8'>
      <h1 className='text-center text-xl font-bold lg:text-3xl'>コーチ変更申請フォーム</h1>

      <div className={cn('flex flex-col gap-8 rounded border p-5', className)}>
        <p className='text-text-secondary'>
          内容を確認の上、申請するボタンをクリックしてください。
        </p>
        <Item
          title='コーチ変更理由'
          text={reason.label !== 'その他' ? reason.label : otherReason}
        />
        <Item title='次のコーチに求めること' text={requestMessage} />
        <Item title='コーチ変更面談にて聞きたいこと・伝えたいこと' text={askMessage} />
        <Item
          title='コーチ変更面談の日程'
          text={useDateTools().formatDate(selectDate, 'YYYY年MM月DD日(ddd) HH:mm〜')}
        />
      </div>

      <div className='flex items-center justify-center gap-5'>
        <Button intent='secondary' className='h-12' onClick={handleBack}>
          入力内容を修正
        </Button>
        <Button className='h-12' onClick={handleSubmit} disabled={isCreating}>
          申請する
        </Button>
      </div>
    </div>
  )
}
