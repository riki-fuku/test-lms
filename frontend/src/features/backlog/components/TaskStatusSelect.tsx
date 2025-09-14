import useFetchUserTaskStatuses from '@/features/backlog/hooks/useFetchUserTaskStatuses'
import type { TaskStatus } from '@/features/backlog/types/TaskStatus'
import { DONE, IN_PROGRESS, TODO } from '@/features/backlog/types/TaskStatus'
import cn from '@/hooks/cn'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type TaskStatusProps = {
  className?: string
  selectedStatus?: TaskStatus | null
  readonly: boolean
  onChange?: (taskStatus: TaskStatus) => void
}

type StatusItemProps = {
  status: TaskStatus
}

export default function TaskStatusSelect({
  className,
  selectedStatus,
  readonly,
  onChange,
}: TaskStatusProps) {
  const selectBoxRef = useRef<HTMLDivElement>(null)
  const [displaySelectedStatus, setDisplaySelectedStatus] = useState<TaskStatus | null>(null)
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)

  const { data: taskStatusList } = useFetchUserTaskStatuses({
    revalidateOnFocus: false,
  })

  const handleClickOutSide = () => {
    setIsOpenSelectBox(false)
  }

  useOutsideClick(selectBoxRef, handleClickOutSide)

  useEffect(() => {
    selectedStatus && setDisplaySelectedStatus(selectedStatus)
  }, [selectedStatus])

  const textColor = (id: number) => {
    if (id === TODO) {
      return 'text-text-primary'
    }
    return 'text-white'
  }

  const bgColor = (id?: number) => {
    if (id === DONE) {
      return 'bg-gradient-to-r from-sub-color to-main-color'
    } else if (id === IN_PROGRESS) {
      return 'bg-bg-tertiary'
    }
    return 'bg-bg-secondary'
  }

  const handleClickSelectBox = () => {
    !readonly && setIsOpenSelectBox(!isOpenSelectBox)
  }

  const handleChangeStatus = (status: TaskStatus) => {
    !readonly &&
      (setDisplaySelectedStatus(status), setIsOpenSelectBox(false), onChange && onChange(status))
  }

  const StatusItem = ({ status }: StatusItemProps) => {
    return (
      <div
        className={cn(
          'flex h-8 w-28 items-center rounded p-2 text-center text-md',
          bgColor(status.value),
          textColor(status.value),
        )}
      >
        {status.label}
      </div>
    )
  }

  return (
    <div className={cn('relative flex flex-col justify-center', className)}>
      <div
        className={cn('flex size-full cursor-pointer items-center justify-between p-2')}
        onClick={handleClickSelectBox}
      >
        <div
          className={cn(
            'flex h-8 w-28 items-center rounded p-2 text-md',
            displaySelectedStatus && bgColor(displaySelectedStatus.value),
            displaySelectedStatus
              ? textColor(displaySelectedStatus.value)
              : 'w-full text-form-gray',
            readonly ? 'justify-center' : 'justify-between',
          )}
        >
          <p>{displaySelectedStatus?.label || '選択してください'}</p>
        </div>
        {!readonly && (
          <div className='text-text-secondary'>
            {isOpenSelectBox ? (
              <IoIosArrowUp className='size-4 stroke-2' />
            ) : (
              <IoIosArrowDown className='size-4 stroke-2' />
            )}
          </div>
        )}
      </div>

      {isOpenSelectBox && (
        <div ref={selectBoxRef} className='flex w-full flex-col bg-white'>
          {taskStatusList?.map((status: TaskStatus) => {
            return (
              <div
                className='flex h-12 cursor-pointer items-center border-t p-2'
                key={status.value}
                onClick={() => {
                  handleChangeStatus(status)
                }}
              >
                <StatusItem status={status} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
