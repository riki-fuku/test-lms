import ProgressBar from '@/components/ui/ProgressBar'
import useFetchUserTaskStatuses from '@/features/backlog/hooks/useFetchUserTaskStatuses'
import { type TaskStatus } from '@/features/backlog/types/TaskStatus'
import type { UserTask } from '@/features/backlog/types/UserTask'
import TaskStatusSelectSmall from '@/features/dashboard/components/TaskStatusSelectSmall'
import useFetchLatestProject from '@/features/userSprint/hooks/useFetchLatestProject'
import { useUserStore } from '@/store/user-store'

export default function LatestSprintMiniBoard() {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const userId = user?.id ?? ''
  const { data, isLoading, mutate } = useFetchLatestProject(workspaceId, userId)
  const { data: taskStatusList } = useFetchUserTaskStatuses({
    revalidateOnFocus: false,
  })

  const handleChangeTaskStatus = async (task: UserTask, status: TaskStatus) => {
    // await updateUserTask(
    //   workspaceId,
    //   userId,
    //   data?.,
    //   task.id,
    //   {
    //     type: task.issueType.id,
    //     summary: task.name,
    //     status: status.id,
    // })
    mutate()
  }

  if (isLoading) return <>loading...</>

  return (
    <div className='flex flex-col gap-5'>
      <div className='border-b pb-2.5'>
        <p>スプリント進捗</p>
      </div>
      <ProgressBar size='sm' progress={data?.latestSprintProgress ?? 0} showProgressNum />
      <div className='flex h-20 flex-col'>
        {data?.tasks?.map((task, index) => {
          const taskStatus = taskStatusList?.find((status) => status.value === task.status)
          if (!taskStatus) return null
          return (
            <div key={index} className='flex justify-between border-b py-1'>
              <p className='truncate pr-4 text-sm text-text-secondary'>{task.summary}</p>
              {taskStatusList && (
                <TaskStatusSelectSmall
                  value={taskStatus}
                  onChange={(status) => handleChangeTaskStatus(task, status)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
