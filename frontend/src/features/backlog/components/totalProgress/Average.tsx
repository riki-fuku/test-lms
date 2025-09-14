import { MdAlignVerticalCenter } from 'react-icons/md'

export default function Average({ averageSP }: { averageSP: number }) {
  const divStyle = 'h-20 w-40 flex flex-col gap-2.5 rounded bg-bg-primary p-2.5 text-nowrap'
  return (
    <div className={divStyle}>
      <div className='flex gap-1 text-sub-color'>
        <MdAlignVerticalCenter className='size-5' />
        <p>平均SP</p>
      </div>
      <p className='text-xl'>
        {averageSP}
        <span className='text-base'>/日</span>
      </p>
    </div>
  )
}
