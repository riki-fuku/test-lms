import Tag from '@/features/settings/components/coach/Tag'
import UserTag from '@/features/settings/components/coach/UserTag'
import cn from '@/hooks/cn'
import { useState } from 'react'

export type User = {
  id: number
  name: string
  roman: string
  avatar: string
}

export type Tag = {
  id: number
  title: string
  author: 'coach' | 'admin'
  users: User[]
}

type TagSettingListProps = {
  tag: Tag
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function TagSettingList({ tag, onEdit, onDelete }: TagSettingListProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className={cn('grid grid-cols-3 border-b', isHover && 'bg-bg-primary')}>
      <div
        className='flex h-20 flex-col gap-2.5  border-r px-5 py-2.5'
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <div className='flex'>
          <Tag title={tag.title} author={tag.author} />
        </div>
        {isHover && tag.author === 'coach' && (
          <div className='flex cursor-pointer gap-5'>
            <p className='text-sm text-main-color' onClick={() => onEdit(tag.id)}>
              編集
            </p>
            <p className='text-sm text-warn-red' onClick={() => onDelete(tag.id)}>
              削除
            </p>
          </div>
        )}
      </div>
      <div className='col-span-2 flex flex-wrap items-start gap-2.5 px-5 py-2.5'>
        {tag.users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
