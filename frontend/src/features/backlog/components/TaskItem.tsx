import TaskStatusSelect from '@/features/backlog/components/TaskStatusSelect'
import useFetchUserTaskStatuses from '@/features/backlog/hooks/useFetchUserTaskStatuses'
import { STORY } from '@/features/backlog/types/TaskType'
import type { UserTask } from '@/features/backlog/types/UserTask'
import { getStatusName } from '@/features/backlog/utils/getStatusName'
import cn from '@/hooks/cn'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IoIosArrowForward } from 'react-icons/io'
import { MdSimCardAlert, MdTask } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'

type TaskItemProps = {
  task: UserTask
  isHistory: boolean
  isDragProcess: boolean
  onClick: () => void
}

export default function TaskItem({ task, isHistory, isDragProcess, onClick }: TaskItemProps) {
  const baseLayoutStyle = 'flex items-center'
  const { data: taskStatusList } = useFetchUserTaskStatuses({
    revalidateOnFocus: false,
  })
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: task.id,
    disabled: isDragProcess,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    backgroundColor: isDragging ? 'lightgray' : 'white',
    flexGrow: 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={cn(
          'flex h-12  flex-1 cursor-pointer items-center justify-between overflow-hidden border-t px-3.5 [&:last-child]:border-b [&>*:last-child]:border-0',
          isHistory && 'border-none',
        )}
        onClick={() => onClick()}
      >
        {isHistory && (
          <div className='text-form-gray'>
            <RxHamburgerMenu className='size-5' />
          </div>
        )}
        <div className={cn(baseLayoutStyle, 'w-7 justify-center text-sm text-text-secondary')}>
          {task.order}.
        </div>
        <div className={cn(baseLayoutStyle, 'flex-1 gap-1 px-2')}>
          <div>
            {task.type === STORY ? (
              <MdTask className='size-5 text-main-color' />
            ) : (
              <MdSimCardAlert className='size-5 text-warn-red' />
            )}
          </div>
          <div className='flex items-start'>
            {task.summary.length > 30 ? `${task.summary.slice(0, 30)}...` : task.summary}
          </div>
        </div>
        <div className={cn(baseLayoutStyle, 'w-16 justify-center')}>{String(task.estimate)}</div>
        <div className={cn(baseLayoutStyle, 'w-32 justify-center')}>
          {!isHistory && (
            <TaskStatusSelect
              className='w-full rounded p-2.5'
              readonly
              selectedStatus={{
                value: task.status,
                label: getStatusName(taskStatusList, task.status),
              }}
            />
          )}
        </div>
        <div className={cn(baseLayoutStyle, 'w-1/5 justify-end')}>
          <IoIosArrowForward className='size-5' />
        </div>
      </div>
    </div>
  )
}
