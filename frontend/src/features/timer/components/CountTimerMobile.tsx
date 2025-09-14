import type { CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'

type CountTimerMobileProps = {
  onEndTimer: () => void
  onBack: () => void
}

function Heading({ timer }: { timer: CountDownTimer }) {
  let heading
  switch (timer.status) {
    case 'READY':
      heading = 'タイマーをセット'
      break
    case 'RUNNING':
      heading = 'タイマー開始'
      break
    case 'PAUSE':
      heading = '一時停止中'
      break
  }
  return <p className='text-xl font-bold'>{heading}</p>
}

export default function CountTimerMobile(props: CountTimerMobileProps) {}
