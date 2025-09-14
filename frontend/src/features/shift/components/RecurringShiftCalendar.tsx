'use client'

import useDateTools from '@/hooks/useDateTools'
import {
  type DateSelectArg,
  type DayHeaderContentArg,
  type EventAddArg,
  type EventClickArg,
  type EventInput,
  type EventMountArg,
} from '@fullcalendar/core/index.js'

import type { ModalMode } from '@/features/scheduleNote/types/Event'
import createEmployeePeriodicShift from '@/features/shift/api/createEmployeePeriodicShift'
import deleteEmployeePeriodicShift from '@/features/shift/api/deleteEmployeePeriodicShift'
import updateEmployeePeriodicShift from '@/features/shift/api/updateEmployeePeriodicShift'
import RecurringShiftCalendarModal from '@/features/shift/components/RecurringShiftCalendarModal'
import useFetchEmployeePeriodicShifts from '@/features/shift/hooks/useFetchEmployeePeriodicShifts'
import { transformToPeriodicShiftEventCalendar } from '@/features/shift/utils/transformToPeriodicShiftEventCalendar'
import cn from '@/hooks/cn'
import useDisclosure from '@/hooks/useDisclosure'
import { useSnackbar } from '@/hooks/useSnackbar'
import type { EventImpl } from '@fullcalendar/core/internal'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import 'public/css/fullCalendar.css'
import { useEffect, useRef, useState } from 'react'

type RecurringShiftCalendarProps = {
  employeeId: string | ''
  isInteractive?: boolean
}

export default function RecurringShiftCalendar({
  employeeId,
  isInteractive = true,
}: RecurringShiftCalendarProps) {
  // 現在時刻の取得
  const { formatDate, formatTime } = useDateTools()
  const modal = useDisclosure()
  const [tmpEventInfo, setTmpEventInfo] = useState<EventImpl | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('CREATE')
  const [eventDom, setEventDom] = useState<HTMLElement | null>(null)
  const [shiftEvents, setShiftEvents] = useState<EventInput[]>([])
  const { data: periodicShifts } = useFetchEmployeePeriodicShifts({ employeeId })
  const [isLoading, setIsLoading] = useState(false)
  const { showWarning } = useSnackbar()

  // カレンダー要素を取得
  const calendarRef = useRef<FullCalendar>(null)
  useEffect(() => {
    if (calendarRef && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(new Date())
    }
  }, [])

  useEffect(() => {
    if (periodicShifts) {
      const transformedPeriodicShiftEvents = transformToPeriodicShiftEventCalendar(periodicShifts)
      setShiftEvents(transformedPeriodicShiftEvents)
    }
  }, [periodicShifts])

  // イベント追加後、stateに一時的にそのイベントの情報を格納
  const handleSetEventInfo = (info: EventAddArg) => {
    setTmpEventInfo(info.event)
  }

  // イベント追加時の処理
  const handleAddEvent = (event: DateSelectArg) => {
    if (dayjs(event.start).day() !== dayjs(event.end).day()) {
      showWarning('曜日を跨ぐ定期シフトは作成できません')
      return
    }

    setModalMode('CREATE')

    if (calendarRef.current) {
      calendarRef.current.getApi().addEvent({
        title: 'シフト',
        start: event.start,
        end: event.end,
        allDay: false, // タイムスロットのみのイベントとして設定
        classNames: [
          'h-auto',
          'bg-white',
          'border-2',
          'border-dotted',
          'border-main-color',
          'fc-event-border',
        ],
        textColor: '#328CE6',
      })
    }

    modal.open()
  }

  const handleClickEvent = (info: EventClickArg) => {
    setModalMode('UPDATE')
    setTmpEventInfo(info.event)
    modal.open()
  }

  const handleEventRender = (arg: EventMountArg) => {
    setEventDom(arg.el)
  }

  const DateHeaderContent = (arg: DayHeaderContentArg) => {
    const { isToday, formatDate } = useDateTools()

    return (
      <div className='flex flex-col items-center justify-center'>
        <span className={cn('text-xl font-light', isToday(arg.date) && ' text-main-color')}>
          {formatDate(arg.date, 'dd')}
        </span>
      </div>
    )
  }

  const handleSave = async (event: EventImpl) => {
    if (!employeeId) {
      throw new Error('ユーザーが存在しません')
    }

    if (!event.start || !event.end) return

    setIsLoading(true)
    try {
      if (modalMode === 'CREATE') {
        await createEmployeePeriodicShift({
          employeeId,
          day: event.start.getDay(),
          startTime: formatTime(event.start),
          endTime: formatTime(event.end),
        })
      } else if (modalMode === 'UPDATE') {
        const shiftId = event.extendedProps.shiftId
        await updateEmployeePeriodicShift(shiftId, {
          day: event.start.getDay(),
          startTime: formatTime(event.start),
          endTime: formatTime(event.end),
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    modal.close()
  }

  const handleDelete = async (event: EventImpl) => {
    event.remove()
    modal.close()

    setIsLoading(true)
    try {
      await deleteEmployeePeriodicShift(event.extendedProps.shiftId)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = (event: EventImpl) => {
    if (modalMode === 'CREATE') {
      event.remove()
    }
    modal.close()
    setTmpEventInfo(null)
  }

  return (
    <>
      {tmpEventInfo && (
        <RecurringShiftCalendarModal
          eventInfo={tmpEventInfo}
          eventDom={eventDom}
          mode={modalMode}
          visible={modal.isOpen}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        locale={jaLocale} // 日本語化
        scrollTime='09:00:00'
        // カレンダーのヘッダー部分の設定
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
        nowIndicator={true} // 現在時刻の線を表示
        allDaySlot={false}
        dayHeaderFormat={{ weekday: 'short' }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        }}
        slotMinTime='06:00:00' // カレンダーの開始時間
        slotMaxTime='23:00:00' //カレンダーの終了時間
        dayHeaderContent={DateHeaderContent} // 日付部分のカスタマイズ
        events={shiftEvents} // イベント
        editable={isInteractive} // ドラッグアンドドロップでの変更の許可
        selectable={isInteractive} // ドラッグ機能の追加
        select={isInteractive ? handleAddEvent : undefined} // ドラックでイベントを追加
        eventAdd={isInteractive ? handleSetEventInfo : undefined} // イベント追加時のコールバック関数
        eventClick={isInteractive ? handleClickEvent : undefined} // イベントクリック時の処理
      />
    </>
  )
}
