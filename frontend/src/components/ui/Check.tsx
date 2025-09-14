import type { AvatarSize } from '@/components/ui/Avatar'
import Avatar from '@/components/ui/Avatar'
import cn from '@/hooks/cn'
import { useCallback, useEffect, useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'

type CheckProps = {
  value: boolean
  size?: 'xs' | 'sm'
  onClick?: (value: boolean) => void
  disable?: boolean
}

export default function Check(props: CheckProps) {
  const [value, setValue] = useState(false)
  const [size, setSize] = useState<{ avatar: AvatarSize; icon: number }>({
    avatar: 'xs',
    icon: 10,
  })

  function handleClick() {
    if (props.disable) return

    setValue(!value)
    props.onClick && props.onClick(!value)
  }

  const getSize: () => { avatar: AvatarSize; icon: number } = useCallback(() => {
    const size = props.size || 'xs'
    switch (size) {
      case 'xs':
        return {
          avatar: 'xs',
          icon: 10,
        }
      case 'sm':
        return {
          avatar: 'sm',
          icon: 14,
        }
    }
  }, [props.size])

  useEffect(() => {
    setSize(getSize())
  }, [getSize])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const className = cn(
    'shrink-0',
    value ? 'bg-gradient-to-r from-sub-color to-main-color' : 'bg-bg-secondary',
    props.disable ? 'cursor-default' : 'cursor-pointer',
  )

  return (
    <>
      <Avatar size={size.avatar} className={className} onClick={handleClick}>
        <GiCheckMark color='#ffffff' size={size.icon} />
      </Avatar>
    </>
  )
}
