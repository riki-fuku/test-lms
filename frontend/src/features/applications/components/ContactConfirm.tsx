import Button from '@/components/ui/Button'
import type { ReasonType } from '@/features/applications/components/Reason'

import cn from '@/hooks/cn'

type ContactConfirmProps = {
  className?: string
  reason: ReasonType
  otherReason?: string
  subject: string
  detail: string
  isCreating: boolean
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ContactConfirm({
  className,
  reason,
  otherReason,
  subject,
  detail,
  isCreating,
  onBack,
  onSubmit,
}: ContactConfirmProps) {
  const Content = ({ title, text }: { title: string; text: string | undefined }) => {
    return (
      <div className='flex flex-col gap-5'>
        <p className='font-bold '>{title}</p>
        <p className={cn(!text && 'text-text-secondary')}>{text ? text : '未入力'}</p>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-8'>
      <h1 className='text-center text-xl font-bold lg:text-3xl'>お問い合わせフォーム</h1>

      <div className={cn('flex flex-col gap-8 rounded border p-5', className)}>
        <p className='text-md text-text-secondary lg:text-base'>
          内容を確認の上、申請するボタンをクリックしてください。
        </p>

        <Content
          title='お問い合わせ項目'
          text={reason.label !== 'その他' ? reason.label : otherReason}
        />
        <Content title='お問い合わせ件名' text={subject} />
        <Content title='お問い合わせ内容' text={detail} />
      </div>

      <div className='flex items-center justify-center gap-5'>
        <Button intent='secondary' className='h-12 w-full lg:w-48' onClick={onBack}>
          入力内容を修正
        </Button>
        <Button className='h-12 w-full lg:w-48' onClick={onSubmit} disabled={isCreating}>
          申請する
        </Button>
      </div>
    </div>
  )
}
