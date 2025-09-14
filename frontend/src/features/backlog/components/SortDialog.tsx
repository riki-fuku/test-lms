import Button from '@/components/ui/Button'
import type { TaskSortOptions } from '@/features/backlog/types/TaskSortOptions'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'

type SortDialogProps = {
  show: boolean
  onSortClick(filters: TaskSortOptions): void
}

export default function SortDialog({ show, onSortClick }: SortDialogProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [sorts, setSorts] = useState<TaskSortOptions>({
    taskName: null,
    taskType: null,
    sp: null,
    id: null,
  })

  useEffect(() => {
    setShowDialog(show)
  }, [show])

  const handleSelectChange = (key: keyof TaskSortOptions, value: string) => {
    setSorts({ ...sorts, [key]: value })
  }

  const handleSortClick = () => {
    onSortClick(sorts)
    setShowDialog(false)
  }

  const SortSelect = (key: keyof TaskSortOptions) => {
    return (
      <select
        className={cn('h-12 w-24 rounded border px-1', !sorts[key] && 'text-form-gray')}
        value={sorts[key] ?? ''}
        onChange={(e) => {
          handleSelectChange(key, e.target.value)
        }}
      >
        <option value=''>選択</option>
        <option value='昇順'>昇順</option>
        <option value='降順'>降順</option>
      </select>
    )
  }

  return (
    <div
      className={cn(
        'absolute right-8 z-10 flex flex-col gap-2 rounded border bg-white px-3 py-5',
        showDialog ? 'block' : 'hidden',
      )}
      onClick={() => {}}
    >
      <div className='flex flex-col gap-5'>
        <div className='grid grid-cols-2 items-center'>
          <p>タスク名</p>
          {SortSelect('taskName')}
        </div>
        <div className='flex items-center justify-between'>
          <p>タイプ</p>
          {SortSelect('taskType')}
        </div>
        <div className='flex items-center justify-between'>
          <p>SP</p>
          {SortSelect('sp')}
        </div>
      </div>
      <div className='mt-5 flex justify-center'>
        <Button onClick={handleSortClick}>並べ替え</Button>
      </div>
    </div>
  )
}
