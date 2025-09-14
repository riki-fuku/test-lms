import SprintHistoryList from '@/features/backlog/components/SprintHistoryList'
import type { UserSprint } from '@/features/backlog/types/UserSprint'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'

type SprintHistoryTableProps = {
  workspaceId: string
  projectId: string
  sprints: UserSprint[]
  isDragProcess: boolean
  onUpdateUserTask: () => void
  openTaskDetail: (task: UserTask, onSave: (task: UserTask) => void) => void
  closeTaskDetail: () => void
}

export default function SprintHistoryTable({
  workspaceId,
  projectId,
  sprints,
  isDragProcess,
  onUpdateUserTask,
  openTaskDetail,
  closeTaskDetail,
}: SprintHistoryTableProps) {
  const baseLayoutStyle = 'flex items-center text-sm text-text-secondary py-2'

  return (
    <div className='flex flex-col'>
      <p className='mb-5 font-bold'>スプリント一覧</p>
      <div className='flex h-9 w-full justify-between border-t px-3.5 [&>*:last-child]:border-0 [&>*]:border-r'>
        <div className={cn(baseLayoutStyle, 'flex-1')}>タスク名</div>
        <div className={cn(baseLayoutStyle, 'w-44 px-2')}>日程</div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>消化日数</div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>SP</div>
        <div className={cn(baseLayoutStyle, 'w-32 justify-center border-none')}></div>
        <div className={cn(baseLayoutStyle, 'w-1/5')}></div>
      </div>
      <div className='[&>*:last-child]:border-b'>
        {sprints.map((sprint, index) => (
          <SprintHistoryList
            key={index}
            workspaceId={workspaceId}
            projectId={projectId}
            sprint={sprint}
            isDragProcess={isDragProcess}
            onUpdateUserTask={onUpdateUserTask}
            openTaskDetail={openTaskDetail}
            closeTaskDetail={closeTaskDetail}
          />
        ))}
      </div>
    </div>
  )
}
