'use client'

import type { Meeting } from '@/features/meeting/types/Meeting'
import createExcludePeriodicScheduleEventDate from '@/features/scheduleNote/api/createExcludePeriodicScheduleEventDate'
import createScheduleEvent from '@/features/scheduleNote/api/createScheduleEvent'
import deleteScheduleEvent from '@/features/scheduleNote/api/deleteScheduleEvent'
import updateScheduleEvent from '@/features/scheduleNote/api/updateScheduleEvent'
import CalendarModal from '@/features/scheduleNote/components/CalendarModal'
import type { ModalMode, ScheduleEvent } from '@/features/scheduleNote/types/Event'
import {
  convertMeetingEventsToFullCalendarFormat,
  convertToScheduleNoteEvents,
} from '@/features/scheduleNote/utils/convertToFullCalendarFormat'
import type { User } from '@/features/user/types/User'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import type {
  DateSelectArg,
  DayHeaderContentArg,
  EventAddArg,
  EventClickArg,
  EventInput,
  EventMountArg,
} from '@fullcalendar/core/index.js'
import type { EventImpl } from '@fullcalendar/core/internal'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'public/css/fullCalendar.css'
import { useEffect, useRef, useState } from 'react'

type CalendarProps = {
  user: Pick<User, 'id'> | null
  selectDate: Date
  scheduleEventsData: ScheduleEvent[]
  meetingsData: Meeting[]
  mutate: () => void
}

const DateHeaderContent = (arg: DayHeaderContentArg) => {
  const { isToday, formatDate } = useDateTools()

  return (
    <div className='flex flex-col items-center justify-center'>
      <span className={cn('text-xs font-light', isToday(arg.date) && ' text-main-color')}>
        {formatDate(arg.date, 'dd')}
      </span>
      <span
        className={cn(
          'flex size-9 items-center justify-center text-xl font-normal',
          isToday(arg.date) && 'rounded-full bg-main-color align-middle text-white',
        )}
      >
        {arg.date.getDate()}
      </span>
    </div>
  )
}

export default function Calendar({
  user,
  selectDate,
  scheduleEventsData,
  meetingsData,
  mutate,
}: CalendarProps) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [tmpEventInfo, setTmpEventInfo] = useState<EventImpl | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('CREATE')
  const [eventDom, setEventDom] = useState<HTMLElement | null>(null)
  const [events, setEvents] = useState<EventInput[]>([])

  // カレンダー要素を取得
  const calendarRef = useRef<FullCalendar>(null)

  useEffect(() => {
    if (calendarRef && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(selectDate) // 選択した日付の週に移動する
    }
  }, [selectDate])

  useEffect(() => {
    const convertedScheduleEvents = convertToScheduleNoteEvents(scheduleEventsData)
    const convertedMeetings = convertMeetingEventsToFullCalendarFormat(meetingsData)

    setEvents([...convertedScheduleEvents, ...convertedMeetings])
  }, [scheduleEventsData, meetingsData])

  // イベント追加後、stateに一時的にそのイベントの情報を格納
  const handleSetEventInfo: (info: EventAddArg) => void = (info: EventAddArg) => {
    setTmpEventInfo(info.event)
  }

  // イベント追加時の処理
  const handleAddEvent = (event: DateSelectArg) => {
    setModalMode('CREATE')
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
    // イベントが面談の場合は編集モーダルを表示しない
    if (info.event.extendedProps.isMeeting) return

    const eventElement = info.el
    setEventDom(eventElement)
    setModalMode('UPDATE') // 更新用モーダルの指定
    setTmpEventInfo(info.event) // クリックしたイベントの設定
    setIsShowModal(true) // モーダルウィンドウを表示
  }

  const handleDeleteEvent = async (
    eventInfo: EventImpl,
    params: {
      startDatetime: string
    },
  ) => {
    const { startDatetime } = params
    if (eventInfo.extendedProps.eventType === 'temporary') {
      await deleteScheduleEvent(eventInfo.id).catch(() => {
        console.error('イベントの削除に失敗しました')
        // @ts-expect-error eventInfo.startがの型を調整
        calendarRef.current?.getApi().addEvent(eventInfo)
      })
    } else if (eventInfo.extendedProps.eventType === 'periodic') {
      await createExcludePeriodicScheduleEventDate({
        userPeriodicScheduleEventId: eventInfo.id,
        date: startDatetime,
      }).catch(() => {
        console.error('イベントの削除に失敗しました')
        // @ts-expect-error eventInfo.startがの型を調整
        calendarRef.current?.getApi().addEvent(eventInfo)
      })
    }
    eventInfo.remove()
    setIsShowModal(false)

    // スケジュールイベントの再取得
    mutate()
  }

  const handleEventRender = (arg: EventMountArg) => {
    setEventDom(arg.el)
  }

  const handleCancel = () => {
    if (modalMode === 'CREATE') {
      if (tmpEventInfo) {
        tmpEventInfo.remove()
      }
    }
    setIsShowModal(false)
    setTmpEventInfo(null)
  }

  const handleSaveEvent = async (
    event: EventImpl,
    params: {
      title: string
      startDatetime: string
      endDatetime: string
    },
  ) => {
    const { title, startDatetime, endDatetime } = params
    switch (modalMode) {
      case 'CREATE':
        await createScheduleEvent({
          userId: user?.id ?? '',
          title: title ?? '',
          startDatetime,
          endDatetime,
        })
        break
      case 'UPDATE':
        if (event.extendedProps.eventType === 'temporary') {
          await updateScheduleEvent(event.id, {
            title: title ?? '',
            startDatetime,
            endDatetime,
          })
        } else if (event.extendedProps.eventType === 'periodic') {
          await Promise.all([
            createExcludePeriodicScheduleEventDate({
              userPeriodicScheduleEventId: event.id,
              date: startDatetime,
            }),
            createScheduleEvent({
              userId: user?.id ?? '',
              title: title ?? '',
              startDatetime,
              endDatetime,
            }),
          ])
          event.setProp('eventType', 'temporary')
        }
        break
      default:
        break
    }

    event.setProp('title', title)
    event.setStart(startDatetime)
    event.setEnd(endDatetime)
    setIsShowModal(false)

    // スケジュールイベントの再取得
    mutate()
  }

  return (
    <>
      {tmpEventInfo && (
        <CalendarModal
          eventInfo={tmpEventInfo}
          eventDom={eventDom}
          mode={modalMode}
          visible={isShowModal}
          onCancel={handleCancel}
          onDelete={handleDeleteEvent}
          onSave={handleSaveEvent}
          calendar={calendarRef}
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
        dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        }}
        dayHeaderContent={DateHeaderContent} // 日付部分のカスタマイズ
        events={events} // イベント
        editable={false} // ドラッグアンドドロップでの変更の許可
        selectable={true} // ドラッグでイベント作成の許可
        select={handleAddEvent} // ドラッグでイベントを追加
        eventAdd={handleSetEventInfo} // イベント追加時のコールバック関数
        eventClick={handleClickEvent} // イベントクリック時の処理
        eventDidMount={handleEventRender} // イベントがレンダリングされる時の処理
      />
    </>
  )
}
