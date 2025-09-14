import useFetchUserTaskTypes from '@/features/backlog/hooks/useFetchUserTaskTypes'
import { BUG, STORY } from '@/features/backlog/types/TaskType'
import cn from '@/hooks/cn'
import type { FC } from 'react'
import { MdSimCardAlert, MdTask } from 'react-icons/md'

type BaseTaskTypeTagProps = {
  className?: string
  name: string
  icon: React.ReactNode
  onClick?: () => void
}

const BaseTaskTypeTag: FC<BaseTaskTypeTagProps> = ({ onClick, icon, name, className }) => {
  return (
    <div
      className={cn('flex h-8 w-28 items-center text-nowrap rounded p-2 text-md', className)}
      onClick={onClick}
    >
      {icon}
      {name}
    </div>
  )
}
export const TaskTypeTagStory: FC<Omit<BaseTaskTypeTagProps, 'name' | 'icon'>> = ({ onClick }) => {
  return (
    <BaseTaskTypeTag
      onClick={onClick}
      icon={<MdTask className='size-5' />}
      name='ストーリー'
      className='bg-bg-blue-primary text-main-color'
    />
  )
}

export const TaskTypeTagBug: FC<Omit<BaseTaskTypeTagProps, 'name' | 'icon'>> = ({ onClick }) => {
  return (
    <BaseTaskTypeTag
      onClick={onClick}
      icon={<MdSimCardAlert className='size-5' />}
      name='バグ'
      className='bg-bg-red-primary text-text-red-primary'
    />
  )
}

type TaskTypeTagProps = Omit<BaseTaskTypeTagProps, 'name' | 'icon'> & {
  typeId: number
}

export const TaskTypeTag: FC<TaskTypeTagProps> = ({ onClick, typeId }) => {
  const { data: taskTypeList } = useFetchUserTaskTypes({
    revalidateOnFocus: false,
  })
  if (!taskTypeList) return <div>不明なタイプ</div>

  const taskType = taskTypeList.find((type) => type.value === typeId)

  if (!taskType) return <div>不明なタイプ</div>

  return (
    <>
      {taskType?.value === STORY && (
        <TaskTypeTagStory onClick={onClick} className='bg-bg-blue-primary text-main-color' />
      )}
      {taskType?.value === BUG && (
        <TaskTypeTagBug onClick={onClick} className='bg-bg-red-primary text-text-red-primary' />
      )}
    </>
  )
}
