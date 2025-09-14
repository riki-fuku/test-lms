import { BsTrash } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'

type TrashedProps = {
  trashedCount: number
  openTrash: () => void
}

export default function Trashed({ trashedCount, openTrash }: TrashedProps) {
  const divStyle =
    'h-20 w-40 flex flex-col gap-2.5 rounded bg-bg-primary p-2.5 hover:drop-shadow cursor-pointer text-nowrap'
  return (
    <div className={divStyle} onClick={openTrash}>
      <div className='flex gap-1 text-warn-red'>
        <BsTrash className='size-5' />
        <p>削除済み</p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-xl'>
          {trashedCount}
          <span className='text-base'>件</span>
        </p>
        <IoIosArrowForward className='size-5' />
      </div>
    </div>
  )
}
