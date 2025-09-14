import cn from '@/hooks/cn'

export type UserCardInfo = {
  cardNumber: string
  cardHolderName: string
  cardExpirationMonth: string
  cardExpirationYear: string
  cardSecurityCode: string
}

export type PaymentDetail = {
  serviceName: string
  period: string
  amount: number
}

type ExtensionConfirmProps = {
  className?: string
  selectedPayment: string
  cardInfo: UserCardInfo | null
  paymentDetail?: PaymentDetail
  email?: string
  otherMessage?: string
}

export default function ExtensionConfirm({
  className,
  selectedPayment,
  cardInfo,
  paymentDetail,
  email,
  otherMessage,
}: ExtensionConfirmProps) {
  const Content = ({ title, content }: { title: string; content: string | undefined }) => {
    return (
      <div className='flex flex-col gap-5'>
        <p className='font-bold '>{title}</p>
        <p className={cn(content ? '' : 'text-text-secondary')}>{content ? content : '未入力'}</p>
      </div>
    )
  }

  const DetailContents = () => {
    const unit = '円（税込）'
    const gridParentStyle = 'grid grid-cols-3'
    const gridChildStyle = 'flex items-center justify-center py-2.5'
    return (
      <div className='text-sm'>
        <div className={cn(gridParentStyle, 'bg-bg-secondary')}>
          <div className='flex items-center justify-start p-2.5'>
            <p>サービス名</p>
          </div>
          <div className={cn(gridChildStyle)}>
            <p>延長期間</p>
          </div>
          <div className={cn(gridChildStyle)}>
            <p>金額</p>
          </div>
        </div>
        <div className={cn(gridParentStyle, 'border-b')}>
          {paymentDetail && (
            <>
              <div className='flex items-center justify-start text-xs lg:p-2.5 lg:text-sm'>
                <p>{paymentDetail.serviceName}</p>
              </div>
              <div className={cn(gridChildStyle, 'flex-col lg:flex-row lg:gap-1')}>
                <p className='text-xs lg:text-sm'>{paymentDetail.period}</p>
              </div>
              <div className={cn(gridChildStyle)}>
                <p className='text-md lg:text-base'>
                  {paymentDetail.amount.toLocaleString()}
                  <span className='text-xs'>{unit}</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  const CardInfo = () => {
    const gridParentStyle = 'grid grid-cols-3'
    const gridHeaderStyle =
      'col-span-1 flex items-center p-2.5 bg-bg-secondary text-sm lg:text-base'
    const gridContentStyle = 'col-span-2 flex items-center p-2.5 text-sm lg:text-base'

    if (!cardInfo) return

    const cardNumberEnd4Digits = cardInfo.cardNumber.slice(-4)

    return (
      <div className='flex flex-col gap-px'>
        <div className={cn(gridParentStyle)}>
          <div className={cn(gridHeaderStyle)}>
            <p>カード番号</p>
          </div>
          <div className={cn(gridContentStyle)}>
            <p>＊＊＊＊＊＊＊＊＊＊＊＊{cardNumberEnd4Digits}</p>
          </div>
        </div>
        <div className={cn(gridParentStyle)}>
          <div className={cn(gridHeaderStyle)}>
            <p>カード名義人</p>
          </div>
          <div className={cn(gridContentStyle)}>
            <p>{cardInfo.cardHolderName}</p>
          </div>
        </div>
        <div className={cn(gridParentStyle)}>
          <div className={cn(gridHeaderStyle)}>
            <p>有効期限</p>
          </div>
          <div className={cn(gridContentStyle)}>
            <p>
              {cardInfo.cardExpirationMonth} / {cardInfo.cardExpirationYear}
            </p>
          </div>
        </div>
        <div className={cn(gridParentStyle)}>
          <div className={cn(gridHeaderStyle)}>
            <p className='hidden lg:block'>セキュリティコード</p>
            <p className='lg:hidden'>CVV</p>
          </div>
          <div className={cn(gridContentStyle)}>
            <p>＊＊＊</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mb-8 flex flex-col gap-8 rounded border p-5', className)}>
      <p className='mb-5 text-md text-text-secondary lg:text-base'>
        内容を確認の上、申請するボタンをクリックしてください。
      </p>
      <Content title='受講延長期間' content={paymentDetail?.serviceName} />
      <Content title='お支払い方法' content={selectedPayment} />
      <div className='flex flex-col gap-5'>
        <p className='font-bold '>請求内容の概要</p>
        <DetailContents />
      </div>
      {cardInfo && (
        <div className='flex flex-col gap-5'>
          <p className='font-bold '>決済するクレジットカード情報</p>
          <CardInfo />
        </div>
      )}
      {email && <Content title='銀行振込先情報の送信先メールアドレス' content={email} />}
      <Content title='その他、伝えたいこと' content={otherMessage} />
    </div>
  )
}
