'use client'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputDate from '@/components/ui/InputDate'
import type { EventImpl } from '@fullcalendar/core/internal'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

import type { Employee } from '@/features/employee/types'
import type { EmployeeStudent } from '@/features/employee/types/EmployeeStudent'
import createMeeting from '@/features/meeting/api/createMeeting'
import destroyMeeting from '@/features/meeting/api/destroyMeeting'
import updateMeeting from '@/features/meeting/api/updateMeeting'
import useDateTools from '@/hooks/useDateTools'
import { useSnackbar } from '@/hooks/useSnackbar'
import type { RefObject } from '@fullcalendar/core/preact.js'
import type FullCalendar from '@fullcalendar/react'
import 'public/css/fullCalendar.css'
import { IoClose } from 'react-icons/io5'

type CounselingModalProps = {
  eventInfo: EventImpl | null
  eventDom: HTMLElement | null
  workspaceId: string
  employee: Employee | null
  students: EmployeeStudent[] | null
  mode: 'CREATE' | 'UPDATE'
  visible: boolean
  onCancel: () => void
  onClose: () => void
  onDelete: () => void
  onSave: () => void
  onSetModalType: () => void
  calendar: RefObject<FullCalendar>
}

export default function CounselingModal({
  eventInfo,
  eventDom,
  workspaceId,
  employee,
  students,
  mode,
  visible,
  onClose,
  onDelete,
  onSave,
}: CounselingModalProps) {
  const [selectStudentId, setSelectStudentId] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isSaving, setIsSaving] = useState(false) // 保存処理中フラグ
  const modalRef = useRef<HTMLDivElement>(null)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (eventInfo) {
      setSelectStudentId(eventInfo.extendedProps.studentId)
      setDate(dayjs(eventInfo.start).format('YYYY-MM-DD') ?? '')
      setStartTime(dayjs(eventInfo.start).format('HH:mm') ?? '')
      setEndTime(dayjs(eventInfo.end).format('HH:mm') ?? '')
    }

    setModalPosition()
  }, [eventInfo])

  const { formatDateTime } = useDateTools()

  const handleChangeSelectStudent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectStudentId(e.target.value)
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value)
  }

  // イベント保存・更新処理
  const handleSaveButton = async () => {
    if (eventInfo) {
      if (!employee) {
        throw new Error('ユーザー情報が取得できませんでした')
      }

      if (!eventInfo.start) {
        throw new Error('面談イベント時間の取得ができませんでした')
      }

      const startDateTime = dayjs(`${date} ${startTime}`)

      // 開始日時が今日の日付より前の場合に警告メッセージを表示
      if (dayjs(startDateTime).isBefore(dayjs())) {
        showSnackbar('過去の日時では予約できません', 'warning')
        return
      }

      if (mode === 'CREATE') {
        try {
          await createMeeting(workspaceId, {
            userId: selectStudentId ?? '',
            employeeId: employee.id,
            startDatetime: formatDateTime(startDateTime.toDate().toISOString()),
            endDatetime: formatDateTime(startDateTime.add(1, 'hour').toDate().toISOString()),
          })
        } catch (error) {
          console.error(error)
          showSnackbar('面談を予約できませんでした', 'error')
          return
        }
      } else if (mode === 'UPDATE') {
        try {
        await updateMeeting(workspaceId, eventInfo.extendedProps.meetingId, {
          userId: selectStudentId ?? '',
            employeeId: employee.id,
            startDatetime: formatDateTime(startDateTime.toDate().toISOString()),
            endDatetime: formatDateTime(startDateTime.add(1, 'hour').toDate().toISOString()),
          })
        } catch (error) {
          console.error(error)
          showSnackbar('面談を更新できませんでした', 'error')
          return
        }
      }

      setIsSaving(true) // 保存開始
      try {
        await onSave()
      } catch (error) {
        console.error(error)
        showSnackbar('保存に失敗しました', 'error')
      } finally {
        setIsSaving(false) // 保存完了
      }
      onClose()
    }
  }

  // イベント削除＋モーダルを閉じる処理
  const handleDeleteEvent = async () => {
    if (eventInfo) {
      if (eventInfo.extendedProps.meetingId) {
        await destroyMeeting(workspaceId, eventInfo.extendedProps.meetingId)
      }
      onDelete()
      onClose()
    }
  }

  // モーダルを閉じる処理
  const handleCloseModal = () => {
    if (mode === 'CREATE') {
      eventInfo?.remove()
    }

    onClose()
  }

  const handleCancelButton = () => {
    if (mode === 'CREATE') {
      handleDeleteEvent()
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
                onClick={handleCloseModal}
                className='absolute right-0 top-[-10px] cursor-pointer'
              >
                <IoClose className='text-text-secondary' size={30} />
              </div>
              <label className='text-sm'>生徒名</label>
              <select
                onChange={handleChangeSelectStudent}
                className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
              >
                {students?.map((student) => (
                  <option
                    key={student.userId}
                    value={student.userId}
                    selected={student.userId == eventInfo?.extendedProps.studentId}
                  >
                    {student.name}
                  </option>
                ))}
              </select>

              <label className='text-sm'>日付</label>
              <InputDate value={date} onChange={handleChangeDate} type='date' className='h-10' />

              <label className='text-sm'>時間</label>
              <div className='flex items-center justify-between gap-2'>
                <InputDate
                  className='rounded border border-solid border-border-primary placeholder:text-form-gray'
                  type='time'
                  onChange={handleChangeStartTime}
                  placeholder='選択'
                  value={startTime}
                />
              </div>

              <Divider />

              <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-4'>
                  <Button className='w-full' intent='secondary' onClick={handleCancelButton}>
                    キャンセル
                  </Button>
                  <Button className='w-full' onClick={handleSaveButton} disabled={isSaving}>
                    {isSaving ? '保存中...' : '保存'}
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
