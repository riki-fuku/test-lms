'use client'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputDate from '@/components/ui/InputDate'
import { calendarModalSelect } from '@/features/scheduleNote/constants/calendarModal'
import type { EventImpl } from '@fullcalendar/core/internal'
import type FullCalendar from '@fullcalendar/react'
import dayjs from 'dayjs'
import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import { useSnackbar } from '@/hooks/useSnackbar'
import 'public/css/fullCalendar.css'
import { IoClose } from 'react-icons/io5'

type CalendarModalProps = {
  eventInfo: EventImpl
  eventDom: HTMLElement | null
  mode: 'CREATE' | 'UPDATE'
  visible: boolean
  onCancel: (event: EventImpl) => void
  onDelete: (
    event: EventImpl,
    params: {
      startDatetime: string
    },
  ) => void
  onSave: (
    event: EventImpl,
    params: {
      title: string
      startDatetime: string
      endDatetime: string
    },
  ) => void
  calendar: RefObject<FullCalendar>
}

export default function CalendarModal({
  eventInfo,
  eventDom,
  mode,
  visible,
  onCancel,
  onDelete,
  onSave,
}: CalendarModalProps) {
  const [title, setTitle] = useState<Option<string> | null>(null)
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (eventInfo) {
      setTitle({ label: eventInfo.title, value: eventInfo.title })
      setEventStartDate(dayjs(eventInfo.start).format('YYYY-MM-DD') ?? '')
      setEventEndDate(dayjs(eventInfo.end).format('YYYY-MM-DD') ?? '')
      setStartTime(dayjs(eventInfo.start).format('HH:mm') ?? '')
      setEndTime(dayjs(eventInfo.end).format('HH:mm') ?? '')
    }

    setModalPosition()
  }, [eventInfo])

  const handleChangeTitle = (option: Option<string> | null) => {
    let className = ['bg-bg-secondary', 'border-none', 'border-transparent']
    let textColor = '#424242'

    if (option?.value === '学習時間') {
      className = [
        'h-auto',
        'bg-gradient-to-r',
        'from-sub-color',
        'to-main-color',
        'border-none',
        'border-transparent',
      ]
      textColor = '#ffffff'
    }

    if (eventInfo) {
      eventInfo.setProp('classNames', className)
      eventInfo.setProp('textColor', textColor)
    }

    setTitle(option)
  }

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventStartDate(e.target.value)
  }

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventEndDate(e.target.value)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
  }

  // イベント保存・更新処理
  const handleSaveButton = async () => {
    const startDateTime = new Date(`${eventStartDate}T${startTime}`)
    const endDateTime = new Date(`${eventEndDate}T${endTime}`)

    // 開始時間が終了時間より後の場合、エラーを表示
    if (startDateTime > endDateTime) {
      showSnackbar('終了時間は開始時間より後に設定してください。', 'error')
      return
    }

    onSave(eventInfo, {
      title: title?.value ?? '',
      startDatetime: `${eventStartDate} ${startTime}`,
      endDatetime: `${eventEndDate} ${endTime}`,
    })
  }

  const handleDeleteEvent = () => {
    if (eventInfo) {
      eventInfo.remove()
      onDelete(eventInfo, {
        startDatetime: `${eventStartDate} ${startTime}`,
      })
    }
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
      modalRef.current.style.top = `50%`
      modalRef.current.style.transform = 'translateY(-50%)'
    }
  }

  return (
    <>
      {visible && (
        <>
          <div
            className='fixed left-0 top-0 z-30 h-screen w-screen bg-transparent'
            onClick={handleCancelButton} // オーバーレイをクリックしたらモーダルを閉じる
          ></div>
          <div
            ref={modalRef}
            className='fixed z-50 mx-auto rounded-lg bg-white px-4 py-8 shadow-2xl'
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
                onChange={handleChangeTitle}
                options={calendarModalSelect}
              />

              <label className='text-sm'>開始日</label>
              <InputDate
                value={eventStartDate}
                onChange={handleChangeStartDate}
                type='date'
                className='h-10'
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

              <label className='text-sm'>終了日</label>
              <InputDate
                value={eventEndDate}
                onChange={handleChangeEndDate}
                type='date'
                className='h-10'
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
                  <Button className='w-full' onClick={handleSaveButton}>
                    保存
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
