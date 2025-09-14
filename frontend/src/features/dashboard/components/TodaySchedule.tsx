'use client'

import useFetchMeetings from '@/features/meeting/hooks/useFetchMeetings'
import useFetchScheduleEvents from '@/features/scheduleNote/hooks/useFetchScheduleEvents'
import {
  convertMeetingEventsToFullCalendarFormat,
  convertToScheduleNoteEvents,
} from '@/features/scheduleNote/utils/convertToFullCalendarFormat'
import { useUserStore } from '@/store/user-store'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import 'public/css/fullCalendar.css'
import 'public/css/todayScheduleFullCalendar.css'
import { useMemo } from 'react'
import { GoCalendar } from 'react-icons/go'

export default function TodaySchedule() {
  const { user } = useUserStore()

  const { data: meetingsData } = useFetchMeetings(user?.activeWorkspace?.workspaceId ?? '', {
    userId: user?.id ?? '',
    startDatetime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endDatetime: dayjs().format('YYYY-MM-DD 23:59:59'),
  })
  const meetings = useMemo(() => meetingsData?.data ?? [], [meetingsData])

  const { data: scheduleNotesData } = useFetchScheduleEvents({
    userId: user?.id ?? '',
    startDatetime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endDatetime: dayjs().format('YYYY-MM-DD 23:59:59'),
  })
  const scheduleNotes = useMemo(() => scheduleNotesData ?? [], [scheduleNotesData])

  const events = useMemo(() => {
    const scheduleNoteEvents = convertToScheduleNoteEvents(scheduleNotes)
    const meetingEvents = convertMeetingEventsToFullCalendarFormat(meetings)
    return [...scheduleNoteEvents, ...meetingEvents]
  }, [scheduleNotes, meetings])

  return (
    <div className='today-schedule h-full'>
      <h3 className='hidden lg:block'>今日のスケジュール</h3>
      <div className='flex items-center gap-2 font-bold lg:hidden'>
        <GoCalendar size={24} />
        <h3>今日のスケジュール</h3>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridFourDay'
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
        views={{
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 1 },
          },
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        }}
        events={events} // イベント
        editable={false} // ドラッグアンドドロップでの変更の許可
        selectable={false} // ドラッグ機能の追加
      />
    </div>
  )
}
