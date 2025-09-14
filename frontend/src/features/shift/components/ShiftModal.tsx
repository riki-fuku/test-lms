'use client'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputDate from '@/components/ui/InputDate'
import type { EventImpl } from '@fullcalendar/core/internal'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

import type { EmployeeShift } from '@/features/shift/type/EmployeeShift'
import useDateTools from '@/hooks/useDateTools'
import type { RefObject } from '@fullcalendar/core/preact.js'
import type FullCalendar from '@fullcalendar/react'
import 'public/css/fullCalendar.css'
import { IoClose } from 'react-icons/io5'

type ShiftModalProps = {
  eventInfo: EventImpl | null
  eventDom: HTMLElement | null
  mode: 'CREATE' | 'UPDATE'
  visible: boolean
  isProcessing: boolean
  onCancel: () => void
  onClose: () => void
  onDelete: (shiftInfo: EmployeeShift) => void
  onSave: (shiftInfo: EmployeeShift) => void
  onSetModalType: () => void
  calendar: RefObject<FullCalendar>
}

export default function ShiftModal({
  eventInfo,
  eventDom,
  mode,
  visible,
  isProcessing,
  onClose,
  onDelete,
  onSave,
}: ShiftModalProps) {
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const { formatDateTime, formatDate } = useDateTools()

  useEffect(() => {
    if (eventInfo) {
      setStartDate(dayjs(eventInfo.start).format('YYYY-MM-DD') ?? '')
      setStartTime(dayjs(eventInfo.start).format('HH:mm') ?? '')
      setEndDate(dayjs(eventInfo.end).format('YYYY-MM-DD') ?? '')
      setEndTime(dayjs(eventInfo.end).format('HH:mm') ?? '')
    }

    setModalPosition()
  }, [eventInfo])

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    setEndDate(e.target.value)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 終了時間を変更された場合は終了日付を開始日付と同じ日付に設定
    setEndDate(startDate)
    setEndTime(e.target.value)
  }

  // イベント保存・更新処理
  const handleSaveButton = () => {
    if (eventInfo) {
      // モーダルの出し分け（シフトか面談予約）のため、タイトルを設定
      eventInfo.setProp('title', 'シフト')
      // 時間の設定
      const startDateTime = new Date(`${startDate}T${startTime}`)
      const endDateTime = new Date(`${endDate}T${endTime}`)
      // 終了時間が開始時間より前の場合、終了時間を翌日に設定
      if (startDateTime >= endDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1)
      }

      // 開始時間と終了時間の変更
      eventInfo.setStart(startDateTime)
      eventInfo.setEnd(endDateTime)

      const shiftId: string = eventInfo.extendedProps.shiftId
      const shiftType: EmployeeShift['shiftType'] = eventInfo.extendedProps.shiftType

      const shiftInfo = {
        shiftId,
        shiftType,
        startDatetime: formatDateTime(startDateTime),
        endDatetime: formatDateTime(endDateTime),
      }

      onSave(shiftInfo)
    }
  }

  // イベント削除＋モーダルを閉じる処理
  const handleDeleteEvent = () => {
    if (eventInfo) {
      eventInfo.remove()
    }

    const shiftId = eventInfo?.extendedProps.shiftId
    const shiftType = eventInfo?.extendedProps.shiftType

    const shiftInfo = {
      shiftId,
      shiftType,
      startDatetime: formatDate(startDate),
      endDatetime: formatDate(endDate),
    }
    if (shiftInfo) {
      onDelete(shiftInfo)
    }
  }

  // モーダルを閉じる処理
  const handleCloseModal = () => {
    onClose()
  }

  const handleCancelButton = () => {
    if (mode === 'CREATE') {
      eventInfo?.remove()
    }

    handleCloseModal()
  }

  const setModalPosition = () => {
    let x = 0
    let y = 0
    const eventDomWidth = eventDom?.getBoundingClientRect().width ?? 0
    const eventDomX = Math.floor(eventDom?.getBoundingClientRect().x ?? 0)
    const eventDomY = Math.floor(eventDom?.getBoundingClientRect().y ?? 0)
    const scrollGrid = document.querySelector('.fc-scrollgrid-section-body')
    const topLimit = scrollGrid?.getBoundingClientRect().y ?? 0

    if (modalRef.current) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const modalWidth = modalRef.current.offsetWidth
      const modalHeight = modalRef.current.offsetHeight
      const offsetX = 5

      // 画面幅からmodalRefが見切れてしまう場合
      if (windowWidth < modalWidth + eventDomX + eventDomWidth) {
        x = eventDomX - modalWidth - offsetX
      } else {
        x = eventDomX + eventDomWidth + offsetX
      }

      // Y方向にmodalRefが見切れてしまう場合
      if (windowHeight < modalHeight + eventDomY) {
        y = windowHeight - modalHeight
      } else if (topLimit > y) {
        y = topLimit
      } else {
        y = eventDomY
      }

      modalRef.current.style.left = `${x}px`
      modalRef.current.style.top = `${y}px`
    }
  }

  return (
    <>
      {visible && (
        <>
          <div
            className='fixed z-30 size-full bg-transparent'
            onClick={handleCancelButton} // オーバーレイをクリックしたらモーダルを閉じる
          ></div>
          <div
            ref={modalRef}
            className='absolute z-50 mx-auto h-fit rounded-lg bg-white px-4 py-8 shadow-2xl'
          >
            <div className='relative m-auto grid gap-4'>
              <div
                onClick={handleCancelButton}
                className='absolute right-0 top-[-10px] cursor-pointer'
              >
                <IoClose className='text-text-secondary' size={30} />
              </div>
              <h3 className='font-bold'>シフトの編集</h3>

              <label className='text-sm'>日付</label>
              <InputDate
                value={startDate}
                onChange={handleChangeStartDate}
                type='date'
                className='h-10'
              />

              <label className='text-sm'>時間</label>
              <div className='flex items-center justify-between gap-2'>
                <InputDate
                  className='rounded border border-solid border-border-primary placeholder:text-form-gray'
                  type='time'
                  onChange={handleChangeStartTime}
                  placeholder='選択'
                  value={startTime}
                />
                <span>〜</span>
                <InputDate
                  className='rounded border border-solid border-border-primary placeholder:text-form-gray'
                  type='time'
                  onChange={handleChangeEndTime}
                  placeholder='選択'
                  value={endTime}
                />
              </div>

              <Divider />

              <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-4'>
                  <Button
                    className='w-full'
                    intent='secondary'
                    onClick={handleCancelButton}
                    disabled={isProcessing}
                  >
                    キャンセル
                  </Button>
                  <Button className='w-full' onClick={handleSaveButton} disabled={isProcessing}>
                    {isProcessing ? '保存中...' : '保存'}
                  </Button>
                </div>
                <div className='flex justify-end'>
                  {mode === 'UPDATE' && (
                    <button
                      className='text-right'
                      onClick={handleDeleteEvent}
                      disabled={isProcessing}
                    >
                      <BsTrash color='red' size={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
