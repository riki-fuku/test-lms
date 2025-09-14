import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import type { ReasonType } from '@/features/applications/components/Reason'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'

type LeaveOfAbsenceConfirmProps = {
  className?: string
  reason: ReasonType
  otherReason?: string
  reasonDetail: string
  startDate: Date
  endDate: Date
  image: { source: string; fileName: string }
  otherMessage?: string
  meetingDate: Date
  isCreating: boolean
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function LeaveOfAbsenceConfirm({
  className,
  reason,
  otherReason,
  reasonDetail,
  startDate,
  endDate,
  image,
  otherMessage,
  meetingDate,
  isCreating,
  onBack,
  onSubmit,
}: LeaveOfAbsenceConfirmProps) {
  const Content = ({ title, text }: { title: string; text: string | undefined }) => {
    return (
      <div className='flex flex-col gap-5'>
        <label className='font-bold'>{title}</label>
        <p className={cn(text ? '' : 'text-text-secondary')}>{text ? text : '未入力'}</p>
      </div>
    )
  }

  const ImageContent = ({
    title,
    content,
  }: {
    title: string
    content: { source: string; fileName: string }
  }) => {
    return (
      <div className='flex flex-col'>
        <p className='font-bold'>{title}</p>
        <div className='relative h-60 overflow-hidden lg:w-80'>
          {content && <Image src={content.source} alt='添付画像' fill />}
        </div>
        <p className='text-xs'>{content.fileName}</p>
      </div>
    )
  }

  return (
    <div className={cn('mb-8 flex w-full flex-col gap-8')}>
      <h1 className='text-center text-3xl font-bold'>休学申請フォーム</h1>

      <div className={cn('flex flex-col gap-10 rounded border p-5', className)}>
        <p className='text-text-secondary'>
          内容を確認の上、申請するボタンをクリックしてください。
        </p>
        <Content title='休学理由' text={reason.label !== 'その他' ? reason.label : otherReason} />
        <Content title='休学詳細理由' text={reasonDetail} />
        <Content
          title='休学開始日'
          text={useDateTools().formatDate(startDate, 'YYYY年MM月DD日(ddd)')}
        />
        <Content
          title='休学終了日'
          text={useDateTools().formatDate(endDate, 'YYYY年MM月DD日(ddd)')}
        />
        <ImageContent title='添付画像' content={image} />
        <Content title='その他、伝えたいこと' text={otherMessage} />
        <Content
          title='休学面談の日程'
          text={useDateTools().formatDate(meetingDate, 'YYYY年MM月DD(ddd)日 HH:mm〜')}
        />
      </div>
      <div className='flex items-center justify-center gap-5'>
        <Button intent='secondary' onClick={onBack}>
          入力内容を修正
        </Button>
        <Button onClick={onSubmit} disabled={isCreating}>
          申請する
        </Button>
      </div>
    </div>
  )
}
