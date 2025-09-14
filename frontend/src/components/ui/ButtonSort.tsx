import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { RiSortDesc } from 'react-icons/ri'

type ButtonSortProps = {
  children?: Readonly<React.ReactNode>
  active?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ButtonSort(props: ButtonSortProps) {
  const [mouseDown, setMouseDown] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(props.active ?? false)
  }, [props.active])

  function handleMouseDown() {
    setMouseDown(true)
  }

  function handleMouseUp() {
    setMouseDown(false)
  }

  function handleMouseLeave() {
    setMouseDown(false)
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const className = cn(
    'cursor-pointer rounded-t-sm text-text-secondary flex text-md px-2 py-2.5  border-b border-b-transparent text-center items-center',
    [mouseDown && 'brightness-75'],
    [isActive && 'text-sub-color border-b-sub-color'],
    [props.disabled ? 'opacity-20' : `hover:bg-bg-hover-primary`],
    props.className,
  )

  return (
    <>
      <button
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        disabled={props.disabled}
      >
        <RiSortDesc className='mr-1 text-base' />
        {props.children ?? '並べ替え'}
      </button>
    </>
  )
}
