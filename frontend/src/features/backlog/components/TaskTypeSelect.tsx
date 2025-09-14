import { TaskTypeTag } from '@/features/backlog/components/TaskTypeTag'
import useFetchUserTaskTypes from '@/features/backlog/hooks/useFetchUserTaskTypes'
import type { TaskType } from '@/features/backlog/types/TaskType'
import { STORY } from '@/features/backlog/types/TaskType'
import cn from '@/hooks/cn'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdSimCardAlert, MdTask } from 'react-icons/md'

type TaskTypeProps = {
  className?: string
  selectedType: TaskType | null
  onChange: (type: TaskType | null) => void
}

export default function TaskTypeSelect({ className, selectedType, onChange }: TaskTypeProps) {
  const selectBoxRef = useRef<HTMLDivElement>(null)
  const [displaySelectedType, setDisplaySelectedType] = useState<TaskType | null>(null)
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)

  const { data: taskTypeList } = useFetchUserTaskTypes({
    revalidateOnFocus: false,
  })

  const handleClickOutSide = () => {
    setIsOpenSelectBox(false)
  }

  useOutsideClick(selectBoxRef, handleClickOutSide)

  useEffect(() => {
    setDisplaySelectedType(selectedType)
  }, [selectedType])

  const textAndBgColor = (id: number) => {
    if (id === STORY) {
      return 'bg-bg-blue-primary text-main-color'
    }
    return 'bg-bg-red-primary text-text-red-primary'
  }

  const handleSelectType = (type: TaskType | null) => {
    setDisplaySelectedType(type)
    onChange(type)
    setIsOpenSelectBox(false)
  }

  return (
    <div className={cn('relative z-10 flex flex-col justify-center', className)}>
      <div
        className={cn('flex size-full cursor-pointer items-center justify-between p-2')}
        onClick={() => setIsOpenSelectBox(!isOpenSelectBox)}
      >
        <div
          className={cn(
            'flex h-8 w-28 items-center rounded p-2 text-md',
            displaySelectedType
              ? textAndBgColor(displaySelectedType.value)
              : 'w-full text-form-gray',
          )}
        >
          {displaySelectedType !== null &&
            (displaySelectedType.value === STORY ? (
              <MdTask className='size-5' />
            ) : (
              <MdSimCardAlert className='size-5' />
            ))}
          <p>{displaySelectedType?.label || '選択してください'}</p>
        </div>
        <div className='text-text-secondary'>
          {isOpenSelectBox ? (
            <IoIosArrowUp className='size-4 stroke-2' />
          ) : (
            <IoIosArrowDown className='size-4 stroke-2' />
          )}
        </div>
      </div>
      {isOpenSelectBox && (
        <div ref={selectBoxRef} className='flex w-full flex-col bg-white'>
          <div
            className='flex h-12 cursor-pointer items-center border-t p-2 text-md text-form-gray'
            onClick={() => {
              handleSelectType(null)
            }}
          >
            選択してください
          </div>
          {taskTypeList &&
            taskTypeList.map((type) => {
              return (
                <div
                  key={type.value}
                  className='flex h-12 cursor-pointer items-center border-t p-2'
                  onClick={() => {
                    handleSelectType(type)
                  }}
                >
                  <TaskTypeTag typeId={type.value} />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
