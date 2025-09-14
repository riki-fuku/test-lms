import cn from '@/hooks/cn'
import { useState } from 'react'

export type TemplateItem = {
  id: number
  title: string
  content: string
}

type ChatMessageTemplateSettingListProps = {
  templateItem: TemplateItem
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function ChatMessageTemplateSettingList({
  templateItem,
  onEdit,
  onDelete,
}: ChatMessageTemplateSettingListProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className={cn('grid grid-cols-3 border-b', isHover && 'bg-bg-primary')}>
      <div
        className='flex h-16 flex-col border-r px-5 py-2.5'
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <p>{templateItem.title}</p>
        {isHover && (
          <div className='flex items-center gap-5'>
            <p
              className='cursor-pointer text-sm text-main-color'
              onClick={() => onEdit(templateItem.id)}
            >
              編集
            </p>
            <p
              className='cursor-pointer text-sm text-warn-red'
              onClick={() => onDelete(templateItem.id)}
            >
              削除
            </p>
          </div>
        )}
      </div>
      <div className='col-span-2 flex h-16 items-center px-5'>{templateItem.content}</div>
    </div>
  )
}
