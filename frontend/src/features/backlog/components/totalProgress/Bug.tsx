import { MdSimCardAlert } from 'react-icons/md'

export default function Bug({ bugCount }: { bugCount: number }) {
  const divStyle = 'h-20 w-40 flex flex-col gap-2.5 rounded bg-bg-primary p-2.5 text-nowrap'
  return (
    <div className={divStyle}>
      <div className='flex gap-1 text-warn-red'>
        <MdSimCardAlert className='size-5' />
        <p>バグ</p>
      </div>
      <p className='text-xl'>
        {bugCount}
        <span className='text-base'>件</span>
      </p>
    </div>
  )
}
