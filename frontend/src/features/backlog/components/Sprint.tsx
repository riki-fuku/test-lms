import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import createUserTask from '@/features/backlog/api/createUserTask'
import TaskAdd from '@/features/backlog/components/TaskAdd'
import TaskList from '@/features/backlog/components/TaskList'
import { defaultTask } from '@/features/backlog/constants/defaultTask'
import { DONE } from '@/features/backlog/types/TaskStatus'
import type { UserSprint } from '@/features/backlog/types/UserSprint'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type SprintProps = {
  workspaceId: string
  projectId: string
  sprint?: UserSprint
  isUser: boolean
  isDragProcess: boolean
  onCreateUserTask: () => void
  openTaskDetail: (task: UserTask, onSave: (task: UserTask) => void) => void
  closeTaskDetail: () => void
  onStartSprint: () => void
  onEndSprint: () => void
}

export default function Sprint({
  workspaceId,
  projectId,
  sprint,
  isUser,
  isDragProcess,
  onCreateUserTask,
  openTaskDetail,
  closeTaskDetail,
  onStartSprint,
  onEndSprint,
}: SprintProps) {
  const { showSnackbar } = useSnackbar()
  const [progress, setProgress] = useState(0)
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId
  const [isCreating, setIsCreating] = useState<boolean>(false)

  useEffect(() => {
    setProgress(calcProgress(sprint?.userTasks ?? []))
  }, [sprint])

  const calcProgress = (tasks: UserTask[]) => {
    const completedTasksCount = tasks.filter((task) => task.status === DONE).length
    if (completedTasksCount === 0) return 0
    return Math.floor((completedTasksCount / tasks.length) * 100)
  }

  const addTask = async (task: UserTask) => {
    if (!sprint) {
      closeTaskDetail()
      throw new Error()
    }

    const firstOrder = sprint.userTasks?.[0]?.order ?? null

    if (isCreating) return
    setIsCreating(true)
    const requestBody = {
      userSprintId: sprint.id,
      status: task.status,
      type: task.type,
      summary: task.summary,
      description: task.description,
      estimate: task.estimate,
      order: firstOrder,
    }
    try {
      await createUserTask(workspaceId, projectUserId, projectId, requestBody)
      onCreateUserTask()
      showSnackbar('タスクを作成しました', 'success')
    } catch (error) {
      showSnackbar('タスク作成に失敗しました', 'error')
      console.error(error)
    } finally {
      setIsCreating(false)
      closeTaskDetail()
    }
  }

  const handleClickTaskAdd = () => {
    openTaskDetail(defaultTask, addTask)
  }

  const baseLayoutStyle = 'flex items-center text-sm text-text-secondary py-2'

  return (
    <div className='border-t'>
      <div className='flex justify-between px-2 py-5'>
        <div>
          <div className='mb-3 flex items-center gap-2'>
            <p className='font-bold'>スプリント{sprint?.sprintNumber}</p>
            <p className='text-sm text-text-secondary'>
              {useDateTools().getSprintFormattedDate(sprint?.startDate)}〜
              {useDateTools().getSprintFormattedDate(sprint?.endDate)}
            </p>
          </div>
          <ProgressBar progress={progress} showProgressNum />
        </div>
        {!isUser ? (
          <div>
            {sprint?.status === 1 ? (
              <Button onClick={onStartSprint}>スプリントを開始する</Button>
            ) : (
              <Button onClick={onEndSprint}>スプリントを終了する</Button>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex w-full justify-between border-t px-3.5 [&>*:last-child]:border-0 [&>*]:border-r'>
        <div className={cn(baseLayoutStyle, 'flex-1')}>タスク名</div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>SP</div>
        <div className={cn(baseLayoutStyle, 'w-32 justify-center')}>ステータス</div>
        <div className={cn(baseLayoutStyle, 'w-1/5')}></div>
      </div>
      <TaskList
        id='sprint'
        workspaceId={workspaceId}
        projectId={projectId}
        tasks={sprint?.userTasks}
        isDragProcess={isDragProcess}
        onUpdateUserTask={onCreateUserTask}
        openTaskDetail={openTaskDetail}
        closeTaskDetail={closeTaskDetail}
      />
      <TaskAdd type='sprint' onClick={handleClickTaskAdd} />
    </div>
  )
}
