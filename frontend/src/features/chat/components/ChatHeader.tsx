import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import InputSearch from '@/components/ui/InputSearch'
import cn from '@/hooks/cn'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

type ChatHeaderProps = {
  name: string
  nickname?: string
  avatar?: string
  isStudentDetail: boolean
  onClickStudentDetail: () => void
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  nickname,
  avatar,
  onChangeSearch,
}) => {
  const [isSearching] = useState(false)

  return (
    <div className={cn('flex items-center justify-between border-b')}>
      {!isSearching ? (
        <div className='flex items-center justify-between p-2.5'>
          <div className='flex items-center gap-2.5'>
            <Avatar size='sm'>
              {avatar ? (
                <Image src={avatar} fill alt='avatar' />
              ) : (
                <FaUserCircle className='size-full bg-white text-text-secondary' />
              )}
            </Avatar>
            <div className='flex items-end gap-1'>
              <p>{name}</p>
              <p className='text-sm text-text-secondary'>{nickname}</p>
            </div>
          </div>
          <div className='flex items-center'></div>
        </div>
      ) : (
        <div className='w-full p-2.5'>
          <InputSearch
            className='!rounded'
            placeholder='検索'
            onChange={onChangeSearch}
            onClear={() =>
              onChangeSearch({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
      )}
    </div>
  )
}
