'use client'

import useDateTools from '@/hooks/useDateTools'
import type {
  DateSelectArg,
  DayHeaderContentArg,
  EventAddArg,
  EventApi,
  EventClickArg,
  EventMountArg,
  EventSourceInput,
} from '@fullcalendar/core/index.js'

import createUserPeriodicScheduleEvent from '@/features/scheduleNote/api/createUserPeriodicScheduleEvent'
import deleteUserPeriodicScheduleEvent from '@/features/scheduleNote/api/deleteUserPeriodicScheduleEvent'
import updateUserPeriodicScheduleEvent from '@/features/scheduleNote/api/updateUserPeriodicScheduleEvent'
import RecurringScheduleCalendarModal from '@/features/scheduleNote/components/RecurringScheduleCalendarModal'
import type { ModalMode, RecurringEventOfFullCalendar } from '@/features/scheduleNote/types/Event'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import type { EventImpl } from '@fullcalendar/core/internal'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import 'public/css/fullCalendar.css'
import { useEffect, useRef, useState } from 'react'

type RecurringScheduleCalendarProps = {
  userId: string
  events: RecurringEventOfFullCalendar[]
  onCreateEvent: () => void
  onUpdateEvent: () => void
  onDeleteEvent: () => void
}

export default function RecurringScheduleCalendar({
  userId,
  events,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
}: RecurringScheduleCalendarProps) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [tmpEventInfo, setTmpEventInfo] = useState<EventImpl | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('CREATE')
  const [eventDom, setEventDom] = useState<HTMLElement | null>(null)
  const { showWarning } = useSnackbar()

  // カレンダー要素を取得
  const calendarRef = useRef<FullCalendar>(null)

  useEffect(() => {
    if (calendarRef && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(new Date()) // 現在時刻の週に移動する
    }
  }, [])

  // イベント追加後、stateに一時的にそのイベントの情報を格納
  const handleSetEventInfo = (info: EventAddArg) => {
    setTmpEventInfo(info.event)
  }

  // カレンダーの重複チェック
  const hasConflictWithExistingEvents = (
    eventStart: Date,
    eventEnd: Date,
    eventId?: string,
  ): boolean => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return false

    const existingEvents: EventApi[] = calendarApi.getEvents()

    const isEventConflict = existingEvents.some((existingEvent) => {
      if (!existingEvent.start || !existingEvent.end || existingEvent.id === eventId) return false
      return eventStart < existingEvent.end && eventEnd > existingEvent.start
    })

    if (isEventConflict) {
      showWarning('同じ時間にイベントが存在します')
    }

    return isEventConflict
  }

  // イベント追加時の処理
  const handleAddEvent = (event: DateSelectArg) => {
    setModalMode('CREATE')

    const hasScheduleConflict = hasConflictWithExistingEvents(event.start, event.end)

    if (hasScheduleConflict) return

    if (calendarRef.current) {
      calendarRef.current.getApi().addEvent({
        title: '学習時間',
        start: event.start,
        end: event.end,
        allDay: false, // タイムスロットのみのイベントとして設定
        classNames: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
      })
    }
    setIsShowModal(true)
  }

  const handleClickEvent = (info: EventClickArg) => {
    setModalMode('UPDATE')
    info.event.setExtendedProp('existingStart', info.event.start)
    info.event.setExtendedProp('existingEnd', info.event.end)
    setTmpEventInfo(info.event)
    setIsShowModal(true)
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
    if (!event.start || !event.end) return

    const hasScheduleConflict = hasConflictWithExistingEvents(event.start, event.end, event.id)

    if (hasScheduleConflict) {
      if (modalMode === 'UPDATE') {
        const { existingStart, existingEnd } = event.extendedProps
        event.setDates(existingStart, existingEnd)
      }
      return
    }

    const body = {
      title: event.title,
      startDayOfWeek: event.start.getDay(),
      startTime: dayjs(event.start).format('HH:mm:ss'),
      endDayOfWeek: event.end.getDay(),
      endTime: dayjs(event.end).format('HH:mm:ss'),
    }

    if (modalMode === 'CREATE') {
      await createUserPeriodicScheduleEvent({
        ...body,
        userId,
      })
      onCreateEvent()
    } else if (modalMode === 'UPDATE') {
      await updateUserPeriodicScheduleEvent(event.id, { ...body })
      onUpdateEvent()
    }
    setIsShowModal(false)
  }

  const handleDelete = async (event: EventImpl) => {
    await deleteUserPeriodicScheduleEvent(event.id)
    event.remove()
    setIsShowModal(false)
    onDeleteEvent()
  }

  const handleCancel = (event: EventImpl) => {
    if (modalMode === 'CREATE') {
      event.remove()
    }
    setIsShowModal(false)
    setTmpEventInfo(null)
  }

  return (
    <>
      {tmpEventInfo && (
        <RecurringScheduleCalendarModal
          eventInfo={tmpEventInfo}
          eventDom={eventDom}
          mode={modalMode}
          visible={isShowModal}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onSave={handleSave}
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
        dayHeaderContent={DateHeaderContent} // 日付部分のカスタマイズ
        events={events as EventSourceInput} // イベント
        editable={false} // ドラッグアンドドロップでの変更の許可
        selectable={true} // ドラッグ機能の追加
        select={handleAddEvent} // ドラックでイベントを追加
        eventAdd={handleSetEventInfo} // イベント追加時のコールバック関数
        eventClick={handleClickEvent} // イベントクリック時の処理
        eventDidMount={handleEventRender} // イベントがレンダリングされる時の処理
      />
    </>
  )
}
