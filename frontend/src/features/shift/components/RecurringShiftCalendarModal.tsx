'use client'

import { weeks } from '@/features/scheduleNote/constants/calendarModal'
import type { EventImpl } from '@fullcalendar/core/internal'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputDate from '@/components/ui/InputDate'
import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import 'public/css/fullCalendar.css'
import { BsTrash } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

type RecurringShiftCalendarModalProps = {
  eventInfo: EventImpl
  eventDom: HTMLElement | null
  mode: 'CREATE' | 'UPDATE'
  visible: boolean
  onCancel: (event: EventImpl) => void
  onDelete: (event: EventImpl) => void
  onSave: (event: EventImpl) => void
  isLoading?: boolean
}

export default function RecurringShiftCalendarModal({
  eventInfo,
  eventDom,
  mode,
  visible,
  onCancel,
  onDelete,
  onSave,
  isLoading,
}: RecurringShiftCalendarModalProps) {
  const { showSnackbar } = useSnackbar()
  const [dayOfWeek, setDayOfWeek] = useState<Option<number> | null>(null)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setModalPosition()

    setStartTime(dayjs(eventInfo.start).format('HH:mm') ?? '')
    setEndTime(dayjs(eventInfo.end).format('HH:mm') ?? '')
    setDayOfWeek(weeks.find((option) => option.value === eventInfo.start?.getDay()) ?? null)
  }, [eventInfo])

  const handleChangeDayOfWeek = (option: Option<number> | null) => {
    setDayOfWeek(option)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
  }

  // 習慣イベント保存・更新処理
  const handleAddHabit = () => {
    if (!dayOfWeek) {
      return
    }

    const date = dayjs().set('day', dayOfWeek.value).format('YYYY-MM-DD')
    const start = dayjs(`${date} ${startTime}`).toDate()
    const end = dayjs(`${date} ${endTime}`).toDate()

    // startよりendが前の場合はエラー
    if (start >= end) {
      showSnackbar('終了時間は開始時間より後に設定してください', 'warning')
      return
    }

    eventInfo.setStart(start)
    eventInfo.setEnd(end)
    onSave(eventInfo)
  }

  // イベント削除＋モーダルを閉じる処理
  const handleDeleteEvent = async () => {
    onDelete(eventInfo)
  }

  const handleCancelButton = () => {
    onCancel(eventInfo)
  }

  const setModalPosition = () => {
    let x = 0
    let y = 0
    const eventDomWidth = eventDom?.getBoundingClientRect().width ?? 0
    const eventDomHeight = eventDom?.getBoundingClientRect().height ?? 0
    const eventDomX = Math.floor(eventDom?.getBoundingClientRect().x ?? 0)
    const eventDomY = Math.floor(eventDom?.getBoundingClientRect().y ?? 0)

    if (modalRef.current) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const modalWidth = modalRef.current.offsetWidth
      const modalHeight = modalRef.current.offsetHeight

      // 画面幅からmodalRefが右に見切れてしまう場合
      if (windowWidth < modalWidth + eventDomX + eventDomWidth) {
        x = eventDomX - modalRef.current.offsetWidth
      }
      // 画面幅からmodalRefが左に見切れてしまう場合
      else if (eventDomX < 0) {
        x = 0
      } else {
        x = eventDomX + eventDomWidth
      }

      // 画面の高さからmodalRefが下に見切れてしまう場合
      if (windowHeight < modalHeight + eventDomY) {
        // 見切れた長さ
        const overHeight = modalHeight + eventDomY - windowHeight
        y = eventDomY - eventDomHeight - overHeight
      }
      // 画面の高さからmodalRefが上に見切れてしまう場合
      else if (eventDomY < 0) {
        y = 0
      } else {
        y = eventDomY
      }

      modalRef.current.style.left = x + 'px'
      modalRef.current.style.top = y + 'px'
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
            className='fixed z-50 mx-auto h-fit rounded-lg bg-white px-4 py-8 shadow-2xl'
          >
            <div className='relative m-auto grid gap-4'>
              <div
                onClick={handleCancelButton}
                className='absolute right-0 top-[-10px] cursor-pointer'
              >
                <IoClose className='text-text-secondary' size={30} />
              </div>
              <h3 className='font-bold'>定期シフトの編集</h3>
              <label className='text-sm'>曜日</label>
              <InputSelect
                item={dayOfWeek}
                options={weeks}
                onChange={handleChangeDayOfWeek}
                className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
              />
              <label className='text-sm'>開始時間</label>
              <div className='flex items-center justify-between gap-2'>
                <InputDate
                  className='rounded border border-solid border-border-primary placeholder:text-form-gray'
                  type='time'
                  onChange={handleChangeStartTime}
                  placeholder='選択'
                  value={startTime}
                />
              </div>
              <label className='text-sm'>終了時間</label>
              <div className='flex items-center justify-between gap-2'>
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
                  <Button className='w-full' intent='secondary' onClick={handleCancelButton}>
                    キャンセル
                  </Button>
                  <Button className='w-full' onClick={handleAddHabit} disabled={isLoading}>
                    {mode === 'CREATE' ? '保存' : '更新'}
                  </Button>
                </div>
                <div className='flex justify-end'>
                  {mode === 'UPDATE' && (
                    <button className='text-right' onClick={handleDeleteEvent} disabled={isLoading}>
                      <BsTrash color='red' size={24} className={cn(isLoading && 'opacity-50')} />
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
