import Button from '@/components/ui/Button'
import cn from '@/hooks/cn'
import { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'

type StudyLogMobileProps = {
  onBack: () => void
}

export default function StudyLogMobile({ onBack }: StudyLogMobileProps) {
  const [isAchieved, setIsAchieved] = useState(true)
  return (
    <>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-bold'>お疲れ様でした！</h2>
        <div className='flex justify-between'>
          <p>今の学習時間</p>
          <p>60:00</p>
        </div>
        <div className='flex justify-between'>
          <p>本日の学習時間</p>
          <p>120:00</p>
        </div>

        <div className='w-full border-t'></div>

        <div className='flex items-center justify-between'>
          <p>本日の目標達成まで</p>
          <div className='flex items-center gap-1'>
            {isAchieved && (
              <div className='flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-sub-color to-main-color'>
                <GiCheckMark className='size-2 fill-white' />
              </div>
            )}
            <p className={cn(isAchieved && 'text-main-color')}>+30:00</p>
          </div>
        </div>

        <div className='flex justify-center gap-2.5'>
          <Button className='h-12 flex-1' intent='secondary'>
            学習ログを確認
          </Button>
          <Button className='h-12 flex-1' onClick={onBack} intent='secondary'>
            タイマー画面に戻る
          </Button>
        </div>
      </div>
    </>
  )
}
