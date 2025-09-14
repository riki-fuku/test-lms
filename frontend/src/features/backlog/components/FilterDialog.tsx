import { useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TaskTypeSelect from '@/features/backlog/components/TaskTypeSelect'
import type { TaskFilterOptions } from '@/features/backlog/types/TaskFilterOptions'
import type { TaskType } from '@/features/backlog/types/TaskType'
import cn from '@/hooks/cn'

type FilterDialogProps = {
  show: boolean
  onFilterClick(filters: TaskFilterOptions): void
}

export default function FilterDialog({ show, onFilterClick }: FilterDialogProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [filters, setFilters] = useState<TaskFilterOptions>({
    taskName: null,
    taskType: null,
    sp: null,
  })

  useEffect(() => {
    setShowDialog(show)
  }, [show])

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, taskName: e.target.value })
  }

  const handleChangeSp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, sp: e.target.value === '' ? null : Number(e.target.value) })
  }

  const handleChangeType = (taskType: TaskType | null) => {
    setFilters({ ...filters, taskType })
  }

  const handleFilterClick = () => {
    setShowDialog(false)
    onFilterClick(filters)
  }

  const handleClickReset = () => {
    const defaultFilters = {
      taskName: null,
      taskType: null,
      sp: null,
    }
    setFilters(defaultFilters)
    setShowDialog(false)
    onFilterClick(defaultFilters)
  }

  return (
    <div
      className={cn(
        'absolute z-10 flex-col gap-2 rounded border bg-white px-3 py-5',
        showDialog ? 'flex' : 'hidden',
      )}
      onClick={() => {}}
    >
      <div>
        <p>タスク名</p>
        <Input
          className='h-12'
          placeholder='テキストを入力'
          value={filters.taskName}
          onChange={handleChangeTitle}
        />
        <p className='mt-3'>タイプ</p>
        <TaskTypeSelect
          className='rounded border'
          onChange={handleChangeType}
          selectedType={filters.taskType}
        />
        <p className='mt-3'>SP</p>
        <Input
          className='h-12'
          placeholder='SPを入力'
          type='number'
          value={filters.sp !== null ? String(filters.sp) : ''}
          onChange={handleChangeSp}
        />
      </div>
      <div className='flex justify-end'>
        <p className='cursor-pointer' onClick={handleClickReset}>
          フィルターをリセット
        </p>
      </div>
      <div className='flex justify-center'>
        <Button onClick={handleFilterClick}>絞り込み</Button>
      </div>
    </div>
  )
}
