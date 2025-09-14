import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { Tag } from '@/features/settings/components/coach/TagSettingList'
import UserTag from '@/features/settings/components/coach/UserTag'
import { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

type EditTagProps = {
  tagItem: Tag
  onSave: (id: number, title: string) => void
  onDelete: (id: number) => void
  onBack: () => void
}

export default function EditTag({ tagItem, onSave, onDelete, onBack }: EditTagProps) {
  const [title, setTitle] = useState('')
  const [titleCount, setTitleCount] = useState(0)
  const maxTitleCount = 20

  useEffect(() => {
    tagItem && setTitle(tagItem.title)
    tagItem && setTitleCount(tagItem.title.length || 0)
  }, [tagItem])

  return (
    <div className='flex h-full flex-col gap-5'>
      <h1 className='text-3xl'>タグを編集</h1>
      <div>
        <p className='mb-2.5 text-xl'>タグタイトル</p>
        <Input
          className='h-12 w-full'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setTitleCount(e.target.value.length)
          }}
        />
        <div className='flex justify-end text-xs text-text-secondary'>
          {titleCount}/{maxTitleCount}
        </div>
      </div>

      <div className='mb-8'>
        <p className='mb-2.5 text-xl'>付与された担当生徒</p>
        <div className='flex h-24 gap-2.5 rounded border p-2.5'>
          {tagItem.users.map((user) => (
            <UserTag key={user.id} user={user} />
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <Button className='h-12' intent='secondary' size='sm' onClick={onBack}>
            戻る
          </Button>
          <Button className='h-12' size='sm' onClick={() => onSave(tagItem.id, title)}>
            保存
          </Button>
        </div>
        <div
          className='flex size-12 cursor-pointer items-center justify-center'
          onClick={() => onDelete(tagItem.id)}
        >
          <BsTrash className='size-4 text-warn-red' />
        </div>
      </div>
    </div>
  )
}
