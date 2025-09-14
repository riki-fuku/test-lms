import cn from '@/hooks/cn'
import { TiStar } from 'react-icons/ti'

export default function Stars(props: { rating: number }) {
  const maxRating = 5

  function getBgColor(index: number) {
    return props.rating >= index + 1 ? 'text-yellow-primary' : 'text-form-gray'
  }

  return (
    <div className='flex items-center'>
      {Array.from({ length: maxRating }).map((_, index) => (
        <TiStar key={index} className={cn('size-5', getBgColor(index))} />
      ))}
    </div>
  )
}
