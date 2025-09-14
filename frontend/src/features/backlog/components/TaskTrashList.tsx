import { useEffect, useState } from 'react'

import Check from '@/components/ui/Check'
import TaskDetail from '@/features/backlog/components/TaskDetail'
import TaskItem from '@/features/backlog/components/TaskItem'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'

type TaskListProps = {
  id?: string
  workspaceId: string
  projectId: string
  isUser: boolean
  tasks?: UserTask[]
  isDragProcess: boolean
  onChangeCheck: (taskIds: string[]) => void
  onHardDelete: (taskIds: string[]) => void
  onRestore: (taskIds: string[]) => void
}

export default function TaskTrashList({
  id,
  workspaceId,
  projectId,
  isUser,
  tasks,
  isDragProcess,
  onChangeCheck,
  onHardDelete,
  onRestore,
}: TaskListProps) {
  const [displayTasks, setDisplayTasks] = useState<UserTask[]>([])
  const [taskDetail, setTaskDetail] = useState<UserTask | null>(null)
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([])

  useEffect(() => {
    tasks && setDisplayTasks(tasks)
    const newCheckedTaskIds = checkedTaskIds.filter(
      (id) => tasks?.findIndex((task) => task.id === id) !== -1,
    )
    setCheckedTaskIds(newCheckedTaskIds)
  }, [tasks])

  useEffect(() => {
    onChangeCheck(checkedTaskIds)
  }, [checkedTaskIds])

  const openDetail = (task: UserTask) => {
    setTaskDetail(task)
  }

  const closeDetail = () => {
    setTaskDetail(null)
  }

  const handleChangeCheck = (taskId: string, value: boolean) => {
    let newCheckedTaskIds = checkedTaskIds
    if (value === true && !checkedTaskIds.includes(taskId)) {
      newCheckedTaskIds = checkedTaskIds.concat(taskId)
    }
    if (value === false && checkedTaskIds.includes(taskId)) {
      newCheckedTaskIds = checkedTaskIds.filter((id) => id !== taskId)
    }
    const alignedCheckedTaskIds = displayTasks
      .map((task) => {
        if (newCheckedTaskIds.includes(task.id)) return task.id
      })
      .filter((id): id is string => id !== undefined)
    setCheckedTaskIds(alignedCheckedTaskIds)
  }

  const taskItemStyle = cn(
    'w-full flex h-12  flex-1 cursor-pointer items-center overflow-hidden border-t px-3.5 [&:last-child]:border-b [&>*:last-child]:border-0',
  )

  return (
    <div className='w-full'>
      {displayTasks.map((task) => (
        <div className={taskItemStyle} key={task.id} id={task.id.toString()}>
          <Check
            value={checkedTaskIds.includes(task.id)}
            onClick={(value) => handleChangeCheck(task.id, value)}
          />
          <TaskItem
            key={task.id}
            task={task}
            isHistory={false}
            isDragProcess={isDragProcess}
            onClick={() => openDetail(task)}
          />
        </div>
      ))}
      {taskDetail !== null && (
        <TaskDetail
          workspaceId={workspaceId}
          projectId={projectId}
          isUser={isUser}
          task={taskDetail}
          onCancel={closeDetail}
          onSave={() => {}}
          isTrashed={true}
          onHardDelete={onHardDelete}
          onRestore={onRestore}
        />
      )}
    </div>
  )
}
