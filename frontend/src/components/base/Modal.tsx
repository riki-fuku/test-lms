import cn from '@/hooks/cn'
import { IoClose } from 'react-icons/io5'

type ModalProps = {
  children: React.ReactNode
  visible: boolean
  className?: string
  close?: boolean
  onClose?: () => void
}

export default function Modal(props: ModalProps) {
  function handleClose() {
    if (props.onClose) props.onClose()
  }

  function handleClickContent(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-20 flex size-full cursor-pointer flex-col items-center justify-center bg-black/50 p-5 lg:p-0',
        props.visible || 'hidden',
      )}
      onClick={handleClose}
    >
      <div
        onClick={handleClickContent}
        className={cn(
          'max-h-[calc(100%-5rem)] w-full overflow-y-auto rounded bg-white px-5 py-8 lg:w-1/2 lg:py-12',
          props.className,
        )}
      >
        {props.children}
      </div>

      {props.close && (
        <div className='mt-5 flex size-12 shrink-0 items-center justify-center rounded-full border-4 text-center lg:hidden'>
          <IoClose className='text-3xl font-bold text-white' />
        </div>
      )}
    </div>
  )
}
