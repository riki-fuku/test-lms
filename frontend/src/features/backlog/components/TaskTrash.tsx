import Button from '@/components/ui/Button'
import TaskTrashList from '@/features/backlog/components/TaskTrashList'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { RiHistoryFill } from 'react-icons/ri'

type TrashProps = {
  workspaceId: string
  projectId: string
  isUser: boolean
  tasks?: UserTask[]
  closeTrash: () => void
  onHardDelete: (taskIds: string[]) => void
  onRestore: (taskIds: string[]) => void
}

export default function TaskTrash({
  workspaceId,
  projectId,
  isUser,
  tasks,
  closeTrash,
  onHardDelete,
  onRestore,
}: TrashProps) {
  const [displayTasks, setDisplayTasks] = useState<UserTask[]>([])
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([])

  useEffect(() => {
    tasks && setDisplayTasks(tasks)
  }, [tasks])

  const handleChangeCheck = (taskIds: string[]) => {
    setCheckedTaskIds(taskIds)
  }

  const handleClickClearButton = () => {
    const taskIds = displayTasks.map((task) => task.id)
    onHardDelete(taskIds)
  }

  const handleClickRestoreButton = () => {
    onRestore(checkedTaskIds)
  }

  const baseLayoutStyle = 'flex items-center text-sm text-text-secondary py-2'
  const clearButtonStyle =
    'text-text-red-primary border border-border-red-primary bg-white hover:bg-bg-red-primary hover:text-text-red-primary hover:drop-shadow'

  return (
    <div className='z-5 size-full'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex cursor-pointer items-center' onClick={closeTrash}>
          <IoIosArrowBack className='size-5' />
          <p className='mx-2 text-lg font-bold'>ゴミ箱</p>
          <p className='text-sm text-text-secondary'>{displayTasks?.length}件のバグ</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button intent='secondary' onClick={handleClickRestoreButton}>
            <p className='flex items-center gap-2'>
              <RiHistoryFill className='size-5' />
              選択したタスクを全て復元
            </p>
          </Button>
          <Button className={clearButtonStyle} intent='secondary' onClick={handleClickClearButton}>
            <p className='flex items-center gap-2'>
              <BsTrash className='size-5' />
              ゴミ箱の中身を空にする
            </p>
          </Button>
        </div>
      </div>
      <div className='flex w-full justify-between border-t px-3.5 [&>*:last-child]:border-0 [&>*]:border-r'>
        <div className={cn(baseLayoutStyle, 'flex-1')}>タスク名</div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>SP</div>
        <div className={cn(baseLayoutStyle, 'w-32 justify-center')}>ステータス</div>
        <div className={cn(baseLayoutStyle, 'w-1/5')}></div>
      </div>
      <TaskTrashList
        id='trash'
        workspaceId={workspaceId}
        projectId={projectId}
        isUser={isUser}
        tasks={displayTasks}
        isDragProcess={false}
        onChangeCheck={handleChangeCheck}
        onHardDelete={onHardDelete}
        onRestore={onRestore}
      />
    </div>
  )
}
