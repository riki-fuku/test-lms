'use client'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputDate from '@/components/ui/InputDate'
import { calendarModalSelect, weeks } from '@/features/scheduleNote/constants/calendarModal'
import type { EventImpl } from '@fullcalendar/core/internal'
import { useEffect, useRef, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import { useSnackbar } from '@/hooks/useSnackbar'
import dayjs from 'dayjs'
import 'public/css/fullCalendar.css'
import { IoClose } from 'react-icons/io5'

type RecurringScheduleCalendarModalProps = {
  eventInfo: EventImpl
  eventDom: HTMLElement | null
  mode: 'CREATE' | 'UPDATE'
  visible: boolean
  onCancel: (event: EventImpl) => void
  onDelete: (event: EventImpl) => void
  onSave: (event: EventImpl) => void
}

export default function RecurringScheduleCalendarModal({
  eventInfo,
  eventDom,
  mode,
  visible,
  onCancel,
  onDelete,
  onSave,
}: RecurringScheduleCalendarModalProps) {
  const [title, setTitle] = useState<Option<string> | null>(null)
  const [startDayOfWeek, setStartDayOfWeek] = useState<Option<number> | null>(null)
  const [startTime, setStartTime] = useState('')
  const [endDayOfWeek, setEndDayOfWeek] = useState<Option<number> | null>(null)
  const [endTime, setEndTime] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    setModalPosition()

    setTitle(calendarModalSelect.find((option) => option.value === eventInfo.title) ?? null)
    setStartDayOfWeek(weeks.find((option) => option.value === eventInfo.start?.getDay()) ?? null)
    setEndDayOfWeek(weeks.find((option) => option.value === eventInfo.end?.getDay()) ?? null)
    setStartTime(dayjs(eventInfo.start).format('HH:mm'))
    setEndTime(dayjs(eventInfo.end).format('HH:mm'))
  }, [eventInfo])

  const handleChangeTitle = (option: Option<string> | null) => {
    let className = ['bg-bg-secondary']
    let textColor = '#424242'

    if (option?.value === '学習時間') {
      className = ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color']
      textColor = '#ffffff'
    }

    if (eventInfo) {
      eventInfo.setProp('classNames', className)
      eventInfo.setProp('textColor', textColor)
    }

    setTitle(option)
  }

  const handleChangeStartDayOfWeek = (option: Option<number> | null) => {
    setStartDayOfWeek(option)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndDayOfWeek = (option: Option<number> | null) => {
    setEndDayOfWeek(option)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
  }

  // 習慣イベント保存・更新処理
  const handleAddHabit = async () => {
    if (!startDayOfWeek || !endDayOfWeek) {
      showSnackbar('開始時間と終了時間を設定してください。', 'warning')
      return
    }

    const startDatetime = dayjs()
      .set('day', startDayOfWeek.value)
      .format('YYYY-MM-DD ' + startTime)
    const endDatetime = dayjs()
      .set('day', endDayOfWeek.value)
      .format('YYYY-MM-DD ' + endTime)
    const start = dayjs(startDatetime).toDate()
    let end = dayjs(endDatetime).toDate()

    // 終了日時が土曜24時の場合のバリデーションを回避
    if (start > end && startDayOfWeek.value > endDayOfWeek.value) {
      end = dayjs(endDatetime).add(1, 'week').toDate()
    }

    // 開始時間が終了時間より後の場合、エラーを表示
    if (start >= end) {
      showSnackbar('終了時間は開始時間より後に設定してください。', 'warning')
      return
    }

    eventInfo.setProp('title', title?.value ?? '')
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

      // 画面幅からmodalRefが右に見切れてしまう場合
      if (windowWidth < modalWidth + eventDomX + eventDomWidth) {
        x = eventDomX - modalWidth - offsetX
      } else {
        x = eventDomX + eventDomWidth + offsetX
      }

      // 画面の高さからmodalRefが下に見切れてしまう場合
      if (windowHeight < modalHeight + eventDomY) {
        y = windowHeight - modalHeight
      }
      // 画面の高さからmodalRefが上に見切れてしまう場合
      else if (topLimit > y) {
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
              <label className='text-sm'>概要</label>
              <InputSelect
                item={title}
                options={calendarModalSelect}
                onChange={handleChangeTitle}
                className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
              />

              <label className='text-sm'>開始曜日</label>
              <InputSelect
                item={startDayOfWeek}
                options={weeks}
                onChange={handleChangeStartDayOfWeek}
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

              <label className='text-sm'>終了曜日</label>
              <InputSelect
                item={endDayOfWeek}
                options={weeks}
                onChange={handleChangeEndDayOfWeek}
                className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
              />

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
                  <Button className='w-full' onClick={handleAddHabit}>
                    {mode === 'CREATE' ? '保存' : '更新'}
                  </Button>
                </div>
                <div className='flex justify-end'>
                  {mode === 'UPDATE' && (
                    <button className='text-right' onClick={handleDeleteEvent}>
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
