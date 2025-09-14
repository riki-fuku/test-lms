type RedCircleIconProps = {
  noticeNum?: number
}

export default function RedCircleIcon({ noticeNum = 0 }: RedCircleIconProps) {
  if (noticeNum < 10 && noticeNum >= 0) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        className='absolute right-[-8px] top-[-5px]'
      >
        <circle cx='10' cy='10' r='9' fill='#FF3434' stroke='#fff' strokeWidth='2' />
        <text className='text-xs' x='7' y='14' stroke='#fff'>
          {noticeNum}
        </text>
      </svg>
    )
  } else if (noticeNum >= 10 && noticeNum < 100) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        className='absolute right-[-8px] top-[-5px]'
      >
        <circle cx='10' cy='10' r='10' fill='#FF3434' stroke='#fff' strokeWidth='2' />
        <text className='text-xs' x='50%' y='50%' dy='.3em' textAnchor='middle' stroke='#fff'>
          {noticeNum}
        </text>
      </svg>
    )
  } else {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='20'
        viewBox='0 0 32 20'
        fill='none'
        className='absolute right-[-14px] top-[-5px]'
      >
        <rect width='32' height='20' rx='11' fill='#fff' />
        <rect x='1' y='1' width='28' height='18' rx='10' fill='#FF3434' />
        <text className='text-xs' x='6' y='13' stroke='#fff'>
          99+
        </text>
      </svg>
    )
  }
}
