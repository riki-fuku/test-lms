import updateUserTask from '@/features/backlog/api/updateUserTask'
import TaskItem from '@/features/backlog/components/TaskItem'
import type { UserTask } from '@/features/backlog/types/UserTask'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type TaskListProps = {
  id?: string
  workspaceId: string
  projectId: string
  tasks?: UserTask[]
  filteredAndSortedTasks?: UserTask[]
  isDragProcess: boolean
  onUpdateUserTask: () => void
  openTaskDetail: (task: UserTask, onSave: (task: UserTask) => void) => void
  closeTaskDetail: () => void
}

export default function TaskList({
  id,
  workspaceId,
  projectId,
  tasks,
  filteredAndSortedTasks,
  isDragProcess,
  onUpdateUserTask,
  openTaskDetail,
  closeTaskDetail,
}: TaskListProps) {
  const { showSnackbar } = useSnackbar()
  const [displayTasks, setDisplayTasks] = useState<UserTask[]>([])
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const { setNodeRef } = useDroppable({
    id: id ? id : 'history',
  })

  useEffect(() => {
    tasks && setDisplayTasks(filteredAndSortedTasks || tasks)
  }, [tasks, filteredAndSortedTasks])

  const handleUpdateTask = async (newTask: UserTask) => {
    if (isUpdating || !projectId) return
    setIsUpdating(true)
    const requestBody = {
      userSprintId: newTask.userSprintId,
      status: newTask.status,
      type: newTask.type,
      summary: newTask.summary,
      description: newTask.description,
      estimate: newTask.estimate,
    }
    try {
      await updateUserTask(workspaceId, projectUserId, projectId, newTask.id, requestBody)
      onUpdateUserTask()
      showSnackbar('タスクを更新しました', 'success')
    } catch (error) {
      showSnackbar('タスク更新に失敗しました', 'error')
      console.error(error)
    } finally {
      setIsUpdating(false)
      closeTaskDetail()
    }
  }

  const openDetail = (task: UserTask) => {
    openTaskDetail(task, handleUpdateTask)
  }

  return (
    <SortableContext id={id} items={tasks ?? []} strategy={verticalListSortingStrategy}>
      <div className='w-full overflow-y-auto' ref={setNodeRef}>
        {displayTasks.map((task) => (
          <div key={task.id} id={task.id.toString()}>
            <TaskItem
              key={task.id}
              task={task}
              isHistory={false}
              isDragProcess={isDragProcess}
              onClick={() => openDetail(task)}
            />
          </div>
        ))}
      </div>
      {/* タスクが空の場合に発生するドラッグ中のレイアウト崩れによる無限ループエラー回避の為のpadding */}
      {!displayTasks.length && <div className='h-12'></div>}
    </SortableContext>
  )
}
