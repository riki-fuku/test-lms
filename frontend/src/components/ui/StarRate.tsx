import { IoStarSharp } from 'react-icons/io5'

type StarRateProps = {
  numerator: number
}

export default function StarRate(props: StarRateProps) {
  const denominator = 5

  function getBgColor(index: number) {
    if (props.numerator >= index + 1) {
      return 'text-yellow-primary'
    } else {
      return 'text-text-disable'
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='flex gap-1'>
        {[...Array(denominator)].map((_, index) => {
          return <IoStarSharp key={index} size={20} className={getBgColor(index)} />
        })}
      </div>
      <span>
        {props.numerator} / {denominator}
      </span>
    </div>
  )
}
