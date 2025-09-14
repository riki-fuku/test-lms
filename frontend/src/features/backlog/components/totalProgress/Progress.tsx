import { BsBarChartSteps } from 'react-icons/bs'

export default function Progress({
  completedSP,
  totalSP,
}: {
  completedSP: number
  totalSP: number
}) {
  const divStyle = 'h-20 w-40 flex flex-col gap-2.5 rounded bg-bg-primary p-2.5 text-nowrap'
  return (
    <div className={divStyle}>
      <div className='flex gap-1 text-main-color'>
        <BsBarChartSteps className='size-5' />
        <p>SP進捗</p>
      </div>
      <p className='text-xl'>
        {completedSP}/{totalSP}pt
      </p>
    </div>
  )
}
