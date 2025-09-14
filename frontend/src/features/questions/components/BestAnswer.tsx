import Image from '@/components/ui/Image'
import { getBreakpointValue } from '@/constants/breakpoint'
import useWindowSize from '@/hooks/useWindowSize'
export default function BestAnswer() {
  const { width } = useWindowSize()

  const iconSize = width && width <= getBreakpointValue('lg') ? 20 : 28

  return (
    <div className='flex items-center gap-1'>
      <div className='relative size-5 lg:size-7'>
        <Image
          src='/images/best_answer.png'
          alt='ベストアンサー'
          width={iconSize}
          height={iconSize}
        />
      </div>
      <p className='text-md font-bold text-warn lg:text-base'>ベストアンサー</p>
    </div>
  )
}
