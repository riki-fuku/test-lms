import Button from '@/components/ui/Button'
import type { ReasonType } from '@/features/applications/components/Reason'
import useDateTools from '@/hooks/useDateTools'

import cn from '@/hooks/cn'

type AbsenceConfirmProps = {
  className?: string
  reason: ReasonType
  otherReason?: string
  reasonDetail: string
  otherMessage?: string
  selectDate: Date
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function CancellationConfirm({
  className,
  reason,
  otherReason,
  reasonDetail,
  otherMessage,
  selectDate,
  onBack,
  onSubmit,
}: AbsenceConfirmProps) {
  const Content = ({ title, text }: { title: string; text: string | undefined }) => {
    return (
      <div className='flex flex-col gap-5'>
        <label className='font-bold '>{title}</label>
        <p className={cn(text && 'text-text-secondary')}>{text ? text : '未入力'}</p>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-8'>
      <h1 className='text-center text-xl font-bold lg:text-3xl'>解約申請フォーム</h1>

      <div className={cn('flex flex-col gap-8 rounded border p-5', className)}>
        <p className='text-md text-text-secondary lg:text-base'>
          内容を確認の上、申請するボタンをクリックしてください。
        </p>

        <Content title='解約理由' text={reason.label !== 'その他' ? reason.label : otherReason} />
        <Content title='解約詳細理由' text={reasonDetail} />
        <Content title='その他、伝えたいこと' text={otherMessage} />
        <Content
          title='解約面談の日程'
          text={useDateTools().formatDate(selectDate, 'YYYY年MM月DD日(ddd) HH:mm〜')}
        />
      </div>

      <div className='flex items-center justify-center gap-5'>
        <Button intent='secondary' onClick={onBack}>
          入力内容を修正
        </Button>
        <Button onClick={onSubmit}>申請する</Button>
      </div>
    </div>
  )
}
