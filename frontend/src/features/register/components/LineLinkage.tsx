import Button from '@/components/ui/Button'
import Link from 'next/link'
import { CiShare1 } from 'react-icons/ci'

type LineLinkageProps = {
  isLinked: boolean
  onConnect: () => void
  onDisconnect: () => void
}

const LINE_OFFICIAL_ACCOUNT_URL = 'https://lin.ee/TGGpk64'

export default function LineLinkage({ isLinked, onConnect, onDisconnect }: LineLinkageProps) {
  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onConnect()
  }

  const handleDisconnect = () => {
    onDisconnect()
  }

  return (
    <>
      <div className='mb-5 flex items-center gap-12 text-center'>
        <h2 className='text-2xl'>LINE通知連携</h2>
        <div className='flex items-center gap-2.5'>
          連携状況：
          <div className='rounded bg-bg-primary px-3 py-1 text-center text-md text-text-primary'>
            {isLinked ? '連携済' : '未連携'}
          </div>
        </div>
      </div>

      {isLinked && (
        <>
          <Link
            href={LINE_OFFICIAL_ACCOUNT_URL}
            target='_blank'
            className='text-light flex h-10 w-56 items-center justify-center gap-1 rounded bg-green-500 text-sm text-white'
          >
            <CiShare1 className='stroke-1 text-lg font-bold' />
            LINE公式アカウントを友達追加
          </Link>
          <p className='text-sm text-text-secondary'>
            LINE公式アカウントを友達追加していただくと、通知を受け取ることができます。
          </p>
          <Button onClick={handleDisconnect} intent='secondary'>
            連携解除
          </Button>
        </>
      )}

      {!isLinked && (
        <button
          type='button'
          className='text-light mb-5 flex h-10 w-48 items-center justify-center gap-1 rounded bg-green-500 text-sm text-white'
          onClick={handleConnect}
        >
          <CiShare1 className='stroke-1 text-lg font-bold' />
          LINE連携をはじめる
        </button>
      )}
    </>
  )
}
