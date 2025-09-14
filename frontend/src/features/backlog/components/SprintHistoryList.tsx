import updateUserTask from '@/features/backlog/api/updateUserTask'
import TaskItem from '@/features/backlog/components/TaskItem'
import type { UserSprint } from '@/features/backlog/types/UserSprint'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

type SprintHistoryListProps = {
  workspaceId: string
  projectId: string
  sprint: UserSprint
  isDragProcess: boolean
  onUpdateUserTask: () => void
  openTaskDetail: (task: UserTask, onSave: (task: UserTask) => void) => void
  closeTaskDetail: () => void
}

export default function SprintHistoryList({
  workspaceId,
  projectId,
  sprint,
  isDragProcess,
  onUpdateUserTask,
  openTaskDetail,
  closeTaskDetail,
}: SprintHistoryListProps) {
  const { showSnackbar } = useSnackbar()
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId

  const handleUpdateTask = async (newTask: UserTask) => {
    if (isUpdating) return
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

  function openDetail(task: UserTask) {
    openTaskDetail(task, handleUpdateTask)
  }

  function getDiffDays(startDateString: string | undefined, endDateString: string | undefined) {
    if (!startDateString || !endDateString) return 0
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)
    const diffTime = startDate.getTime() - endDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays
  }

  function getFormattedDate(dateString: string | undefined) {
    if (!dateString) return ''
    const formattedDate = format(parseISO(dateString), 'M月d日', { locale: ja })
    return formattedDate
  }

  const baseLayoutStyle = 'flex items-center py-2.5'

  return (
    <div className='w-full'>
      <div className='flex h-12 w-full justify-between border-t px-3.5'>
        <div className={cn(baseLayoutStyle, 'flex-1 gap-5')}>
          {isOpen ? (
            <IoIosArrowDown className='size-5' onClick={() => setIsOpen(false)} />
          ) : (
            <IoIosArrowForward className='size-5' onClick={() => setIsOpen(true)} />
          )}
          スプリント{sprint.sprintNumber}
        </div>
        <div className={cn(baseLayoutStyle, 'w-44 px-2')}>
          {getFormattedDate(sprint.startDate)}〜{getFormattedDate(sprint.endDate)}
        </div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>
          {getDiffDays(sprint.startDate, sprint.endDate)}日
        </div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}></div>
        <div className={cn(baseLayoutStyle, 'w-32 justify-center')}></div>
        <div className={cn(baseLayoutStyle, 'w-1/5')}></div>
      </div>

      <SortableContext
        id={`history${sprint.id}`}
        items={sprint.userTasks || []}
        strategy={verticalListSortingStrategy}
      >
        {isOpen &&
          sprint.userTasks?.map((task) => (
            <div key={task.id}>
              <TaskItem
                key={task.id}
                task={task}
                isHistory
                isDragProcess={isDragProcess}
                onClick={() => openDetail(task)}
              />
            </div>
          ))}
      </SortableContext>
    </div>
  )
}
