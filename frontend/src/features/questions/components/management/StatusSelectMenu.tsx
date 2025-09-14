import SelectBoxItem from '@/features/questions/components/management/SelectBoxItem'
import StatusIcon from '@/features/questions/components/management/StatusIcon'
import useFetchQuestionStatuses from '@/features/questions/hooks/useFetchQuestionStatuses'
import type { Question } from '@/features/questions/types/Question'
import {
  IN_PROGRESS,
  ON_HOLD,
  RESOLVED,
  STAFF_REPLIED,
  UNHANDLED,
} from '@/features/questions/types/QuestionStatus'
import cn from '@/hooks/cn'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEmployeeStore } from '@/store/employee-store'
import { useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type StatusSelectMenuProps = {
  questionResponder: Question['questionResponder']
  lastResponder: Question['lastResponder']
  status: number
  onChangeStatus: (status?: number, questionResponderId?: string | null) => void
}

export default function StatusSelectMenu({
  questionResponder,
  lastResponder,
  status,
  onChangeStatus,
}: StatusSelectMenuProps) {
  const loginEmployee = useEmployeeStore((state) => state.employee)
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)

  const selectBoxRef = useRef(null)
  useOutsideClick(selectBoxRef, () => setIsOpenSelectBox(false))

  const { data: statusList } = useFetchQuestionStatuses({
    revalidateOnFocus: false,
  })

  const selectBoxStatusList = statusList?.concat({ value: IN_PROGRESS, label: '対応中' })

  const handleChangeStatus = (statusValue: number) => {
    setIsOpenSelectBox(false)
    if (!loginEmployee) {
      return
    }

    switch (statusValue) {
      case UNHANDLED:
        onChangeStatus(UNHANDLED, null)
        break
      case RESOLVED:
        onChangeStatus(RESOLVED, null)
        break
      case ON_HOLD:
        onChangeStatus(ON_HOLD, questionResponder?.id)
        break
      case IN_PROGRESS:
        ;(questionResponder === null ||
          (questionResponder && loginEmployee.id !== questionResponder.id)) &&
          onChangeStatus(undefined, loginEmployee.id)
    }
  }

  const handleOpen = () => {
    setIsOpenSelectBox(!isOpenSelectBox)
  }

  const statusText = (status: number) => {
    if (status === RESOLVED && lastResponder !== null) {
      return lastResponder?.name + 'が解決済み'
    }

    if (questionResponder !== null) {
      return questionResponder?.name + 'が対応中'
    }

    return statusList?.find((s) => s.value === status)?.label ?? ''
  }

  return (
    <>
      <div className='flex cursor-pointer items-center gap-2.5' onClick={handleOpen}>
        <div className='flex items-center gap-1'>
          <StatusIcon status={status} questionResponder={questionResponder} />
          <p
            className={cn(
              'text-md',
              status === UNHANDLED && questionResponder === null && 'text-warn-red',
            )}
          >
            {statusText(status)}
          </p>
        </div>
        <div className='relative'>
          {isOpenSelectBox ? (
            <IoIosArrowUp className='fill-text-secondary' size={20} />
          ) : (
            <IoIosArrowDown className='fill-text-secondary' size={20} />
          )}
          {isOpenSelectBox && (
            <div
              ref={selectBoxRef}
              className='absolute top-8 z-10 flex w-48 flex-col gap-2.5 rounded bg-white p-2.5 drop-shadow'
            >
              <p className='text-md'>ステータスを選択</p>
              <div>
                {selectBoxStatusList?.map((status, index) => {
                  if (status.value !== STAFF_REPLIED) {
                    return (
                      <div
                        className='relative flex cursor-pointer items-center border-t p-2.5 text-md'
                        key={index}
                        onClick={() => {
                          handleChangeStatus(status.value)
                        }}
                      >
                        <div></div>
                        <div className='flex items-center'>
                          <SelectBoxItem
                            status={status}
                            questionResponder={questionResponder}
                            userId={loginEmployee?.id || ''}
                          />
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
