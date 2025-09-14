import useFetchUserTaskStatuses from '@/features/backlog/hooks/useFetchUserTaskStatuses'
import { DONE, IN_PROGRESS, TODO, type TaskStatus } from '@/features/backlog/types/TaskStatus'
import cn from '@/hooks/cn'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type TaskStatusProps = {
  value: TaskStatus
  className?: string
  onChange?: (status: TaskStatus) => void
}

type StatusItemProps = {
  status: TaskStatus
}

export default function TaskStatusSelectSmall({ value, className, onChange }: TaskStatusProps) {
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)

  const { data } = useFetchUserTaskStatuses({
    revalidateOnFocus: false,
  })
  const taskStatusList = data ?? []

  const selectBoxRef = useRef<HTMLDivElement>(null)
  useOutsideClick(selectBoxRef, () => setIsOpenSelectBox(false))

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

  const handleChangeStatus = (status: TaskStatus) => {
    setIsOpenSelectBox(false)
    onChange && onChange(status)
  }

  const StatusItem = (props: StatusItemProps) => {
    return (
      <div
        className={cn(
          'flex h-4 w-12 items-center overflow-hidden rounded p-1 text-center',
          bgColor(props.status.value),
          textColor(props.status.value),
        )}
      >
        <p className='whitespace-nowrap text-xxs'>{props.status.label}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex w-12 shrink-0 flex-col items-end justify-center',
        className,
        isOpenSelectBox && 'z-10',
      )}
    >
      <div
        className={cn(
          'flex h-4 w-full cursor-pointer items-center justify-between whitespace-nowrap rounded p-1',
          value && bgColor(value.value),
          value ? textColor(value.value) : 'text-form-gray',
        )}
        onClick={() => setIsOpenSelectBox(!isOpenSelectBox)}
      >
        <p className='text-xxs'>{value?.label || '選択してください'}</p>
        <div className='text-text-secondary'>
          {isOpenSelectBox ? (
            <IoIosArrowUp className={cn(value && textColor(value.value), 'size-2')} />
          ) : (
            <IoIosArrowDown className={cn(value && textColor(value.value), 'size-2')} />
          )}
        </div>
      </div>
      {isOpenSelectBox && (
        <div ref={selectBoxRef} className='absolute top-5 flex w-14 flex-col gap-0.5 bg-white'>
          {taskStatusList.map((status) => {
            return (
              <div
                className='flex h-4 cursor-pointer items-center p-0.5'
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
