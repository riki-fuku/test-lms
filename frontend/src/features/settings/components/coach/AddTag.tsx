import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AddStudentList from '@/features/settings/components/coach/AddStudentList'
import type { Tag, User } from '@/features/settings/components/coach/TagSettingList'
import { useState } from 'react'

type AddTagProps = {
  allUsers: User[]
  onCreate: (tagItem: Tag) => void
  onBack: () => void
}

export default function AddTag({ allUsers, onCreate, onBack }: AddTagProps) {
  const [title, setTitle] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [titleCount, setTitleCount] = useState(0)
  const maxTitleCount = 20

  // 定型文新規作成テスト用ID
  const sampleCreateId = 999

  const handleSelect = (id: number, isSelect: boolean) => {
    const user = allUsers.find((user) => user.id === id)

    user &&
      (isSelect
        ? setUsers((prev) => [...prev, user])
        : setUsers((prev) => prev.filter((user) => user.id !== id)))
  }

  return (
    <div className='flex h-full flex-col gap-5'>
      <h1 className='text-3xl'>タグを編集</h1>
      <div>
        <p className='mb-2.5 text-xl'>タグタイトル</p>
        <Input
          className='h-12 w-full'
          value={title}
          placeholder='タグタイトルを入力'
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
        <div className='flex items-center gap-2.5'>
          <p className='mb-2.5 text-xl'>付与する担当生徒</p>
          <p className='text-md text-text-secondary'>※複数選択可</p>
        </div>
        <div className='flex flex-col gap-2.5 p-2.5'>
          {allUsers.map((user) => (
            <AddStudentList key={user.id} user={user} onSelect={handleSelect} />
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <Button className='h-12' intent='secondary' size='sm' onClick={onBack}>
            キャンセル
          </Button>
          <Button
            className='h-12'
            size='sm'
            onClick={() =>
              title &&
              onCreate({
                id: sampleCreateId,
                title,
                author: 'coach',
                users,
              })
            }
          >
            追加
          </Button>
        </div>
      </div>
    </div>
  )
}
