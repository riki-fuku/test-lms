'use client'

import useDateTools from '@/hooks/useDateTools'
import type {
  DateSelectArg,
  DayHeaderContentArg,
  EventAddArg,
  EventClickArg,
  EventInput,
  EventMountArg,
} from '@fullcalendar/core/index.js'
import { useEffect, useMemo, useRef, useState } from 'react'

import useFetchEmployeeStudents from '@/features/employee/hooks/useFetchEmployeeStudents'
import type { Employee } from '@/features/employee/types'
import useFetchGoogleCalendarEvents from '@/features/google/hooks/useFetchGoogleCalendarEvents'
import useFetchMeetings from '@/features/meeting/hooks/useFetchMeetings'
import type { ModalMode } from '@/features/scheduleNote/types/Event'
import createEmployeeShiftExcludeDate from '@/features/shift/api/createEmployeeShiftExcludeDate'
import createEmployeeTemporaryShift from '@/features/shift/api/createEmployeeTemporaryShift'
import deleteEmployeeTemporaryShift from '@/features/shift/api/deleteEmployeeTemporaryShift'
import updateEmployeeTemporaryShift from '@/features/shift/api/updateEmployeeTemporaryShift'
import CounselingModal from '@/features/shift/components/CounselingModal'
import ShiftModal from '@/features/shift/components/ShiftModal'
import useFetchEmployeeShifts from '@/features/shift/hooks/useFetchEmployeeShifts'
import type { EmployeeShift } from '@/features/shift/type/EmployeeShift'
import { transformGoogleCalendarEventsToFullCalendarEvents } from '@/features/shift/utils/transformGoogleCalendarEventsToFullCalendarEvents'
import { transformMeetingsToFullCalendarEvents } from '@/features/shift/utils/transformMeetingsToFullCalendarEvents'
import { transformToShiftEventCalendar } from '@/features/shift/utils/transformToShiftEventCalendar'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import type { EventImpl } from '@fullcalendar/core/internal'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import 'public/css/fullCalendar.css'
import { HiPlus } from 'react-icons/hi'

type CalendarProps = {
  employee: Employee | null
  workspaceId: string
  selectDate: Date
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

export default function Calendar({ employee, workspaceId, selectDate }: CalendarProps) {
  // コーチシフト取得
  const { data: employeeShifts, mutate: mutateEmployeeShifts } = useFetchEmployeeShifts({
    employeeId: employee?.id ?? '',
    startDate: dayjs(selectDate).startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs(selectDate).endOf('week').format('YYYY-MM-DD'),
  })

  // コーチ担当ユーザ取得
  const { data: students } = useFetchEmployeeStudents(workspaceId, employee?.id ?? '')

  // 面談取得
  const { data: meetingsData, mutate: mutateMeetings } = useFetchMeetings(workspaceId, {
    employeeId: employee?.id ?? '',
    startDatetime: dayjs(selectDate).startOf('week').format('YYYY-MM-DD HH:mm:ss'),
    endDatetime: dayjs(selectDate).endOf('week').format('YYYY-MM-DD HH:mm:ss'),
  })
  const meetings = useMemo(() => meetingsData?.data ?? [], [meetingsData])

  // Googleカレンダーイベント取得
  const { data: googleCalendarEventsData } = useFetchGoogleCalendarEvents(
    {
      employeeId: employee?.id ?? '',
      startDate: dayjs(selectDate).startOf('week').format('YYYY-MM-DD'),
      endDate: dayjs(selectDate).endOf('week').format('YYYY-MM-DD'),
    },
    {
      revalidateOnFocus: false,
    },
  )
  const googleCalendarEvents = useMemo(
    () => googleCalendarEventsData ?? [],
    [googleCalendarEventsData],
  )

  // 現在時刻の取得
  const { showSnackbar } = useSnackbar()
  const [isShowModal, setIsShowModal] = useState(false)
  const [isOnlyForShift, setIsOnlyForShift] = useState(true)
  const [tmpEventInfo, setTmpEventInfo] = useState<EventImpl | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>('CREATE')
  const [eventDom, setEventDom] = useState<HTMLElement | null>(null)
  const [events, setEvents] = useState<EventInput[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // カレンダー要素を取得
  const calendarRef = useRef<FullCalendar>(null)

  useEffect(() => {
    if (calendarRef && calendarRef.current) {
      // 選択した日付の週に移動する
      calendarRef.current.getApi().gotoDate(selectDate)
    }
  }, [selectDate, employee])

  useEffect(() => {
    if (employeeShifts && meetings) {
      const transformedShiftEvents = transformToShiftEventCalendar(employeeShifts)
      const transformedMeetings = transformMeetingsToFullCalendarEvents(meetings)

      // 面談の予定と重複するGoogleカレンダーイベントは除外する
      const googleCalendarIdsByMeetings = meetings.map((meeting) => meeting.googleEventId)
      const filteredGoogleCalendarEvents = googleCalendarEvents.filter(
        (event) => !googleCalendarIdsByMeetings.includes(event.id),
      )
      const transformedGoogleCalendarEvents = transformGoogleCalendarEventsToFullCalendarEvents(
        filteredGoogleCalendarEvents,
      )

      setEvents([
        ...transformedShiftEvents,
        ...transformedMeetings,
        ...transformedGoogleCalendarEvents,
      ])
    }
  }, [employeeShifts, meetings, googleCalendarEvents])

  // イベント追加後、stateに一時的にそのイベントの情報を格納
  const handleSetEventInfo = (info: EventAddArg) => {
    setTmpEventInfo(info.event)
  }

  // イベント追加時の処理
  const handleAddEvent = (event: DateSelectArg) => {
    setModalMode('CREATE')
    setIsOnlyForShift(true)

    if (calendarRef.current) {
      calendarRef.current.getApi().addEvent({
        title: 'シフト',
        start: event.start,
        end: event.end,
        allDay: false, // タイムスロットのみのイベントとして設定
        backgroundColor: '#fff',
        classNames: ['h-auto', 'border-2', 'border-dotted', 'fc-event-border'],
        textColor: '#00B900',
        borderColor: '#00B900',
      })
    }

    setIsShowModal(true)
  }

  // イベントクリック時の処理
  const handleClickEvent = (info: EventClickArg) => {
    // 更新用モーダルの指定
    setModalMode('UPDATE')

    // クリックしたイベントの設定
    setTmpEventInfo(info.event)

    // モーダルウィンドウの出し分け
    if (info.event.title === 'シフト') {
      setIsOnlyForShift(true)
    } else {
      setIsOnlyForShift(false)
    }
    // モーダルウィンドウを表示
    setIsShowModal(true)
  }

  // イベントがレンダリングされる時の処理
  const handleEventRender = (arg: EventMountArg) => {
    setEventDom(arg.el)
  }

  // 面談予約ボタンクリック時の処理
  const handleClickCounselingButton = () => {
    if (!students || students.length === 0) {
      showSnackbar('担当している生徒がいないため面談予約はできません', 'error')
      return
    }

    const now = new Date()
    // 面談予約の時間を30分刻みにする
    let start
    if (now.getMinutes() <= 30) {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 30)
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0)
    }

    if (calendarRef.current) {
      calendarRef.current.getApi().addEvent({
        title: '面談予約',
        studentId: students[0].userId,
        start,
        end: start.getHours() + 1,
        allDay: false, // タイムスロットのみのイベントとして設定
        classNames: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
        textColor: '#ffffff',
      })
    }

    setModalMode('CREATE')
    setIsOnlyForShift(false)
    setIsShowModal(true)
  }

  // シフトイベント保存時の処理
  const handleSaveShiftEvent = async (shiftInfo: EmployeeShift) => {
    if (!employee) {
      throw new Error('ユーザー情報が取得できませんでした')
    }

    // 処理中の場合は処理を中断
    if (isProcessing) return

    try {
      // 処理開始
      setIsProcessing(true)

      switch (shiftInfo.shiftType) {
        case 'temporary':
          await updateEmployeeTemporaryShift(shiftInfo.shiftId, {
            startDatetime: shiftInfo.startDatetime,
            endDatetime: shiftInfo.endDatetime,
          })
          break
        case 'periodic':
          await Promise.all([
            createEmployeeShiftExcludeDate({
              employeePeriodicShiftId: shiftInfo.shiftId,
              date: shiftInfo.startDatetime,
            }),
            createEmployeeTemporaryShift({
              employeeId: employee.id,
              startDatetime: shiftInfo.startDatetime,
              endDatetime: shiftInfo.endDatetime,
            }),
          ])
          break
        default:
          await createEmployeeTemporaryShift({
            employeeId: employee.id,
            startDatetime: shiftInfo.startDatetime,
            endDatetime: shiftInfo.endDatetime,
          })
      }

      mutateEmployeeShifts()
    } catch (error) {
      console.error('シフトの保存中にエラーが発生しました:', error)
    } finally {
      // 処理完了
      setIsProcessing(false)
    }

    setIsShowModal(false)
  }

  // シフトイベント削除時の処理
  const handleDeleteEvent = async (shiftInfo: EmployeeShift) => {
    // 処理中の場合は処理を中断
    if (isProcessing) return

    try {
      // 処理開始
      setIsProcessing(true)

      if (shiftInfo.shiftType === 'temporary') {
        await deleteEmployeeTemporaryShift(shiftInfo.shiftId)
      } else {
        await createEmployeeShiftExcludeDate({
          employeePeriodicShiftId: shiftInfo.shiftId,
          date: shiftInfo.startDatetime,
        })
      }

      mutateEmployeeShifts()
    } catch (error) {
      console.error('シフトの削除中にエラーが発生しました:', error)
    } finally {
      // 処理完了
      setIsProcessing(false)
    }

    setIsShowModal(false)
  }

  return (
    <>
      {isOnlyForShift ? (
        <ShiftModal
          eventInfo={tmpEventInfo}
          eventDom={eventDom}
          mode={modalMode}
          visible={isShowModal}
          isProcessing={isProcessing}
          onCancel={() => setIsShowModal(false)}
          onClose={() => setIsShowModal(false)}
          onDelete={handleDeleteEvent}
          onSave={handleSaveShiftEvent}
          onSetModalType={() => setIsOnlyForShift(true)}
          calendar={calendarRef}
        />
      ) : (
        <CounselingModal
          eventInfo={tmpEventInfo}
          eventDom={eventDom}
          workspaceId={workspaceId}
          employee={employee}
          students={students ?? []}
          mode={modalMode}
          visible={isShowModal}
          onCancel={() => setIsShowModal(false)}
          onClose={() => setIsShowModal(false)}
          onDelete={mutateMeetings}
          onSave={mutateMeetings}
          onSetModalType={() => setIsOnlyForShift(false)}
          calendar={calendarRef}
        />
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        locale={jaLocale} // 日本語化
        scrollTime='09:00:00' // カレンダーの表示位置を現在時刻に合わせる
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
        selectable={true} // ドラッグ機能の追加
        select={handleAddEvent} // ドラックでイベントを追加
        eventAdd={handleSetEventInfo} // イベント追加時のコールバック関数
        eventClick={handleClickEvent} // イベントクリック時の処理
        eventDidMount={handleEventRender} // イベントがレンダリングされる時の処理
      />

      <button
        disabled={isShowModal}
        onClick={handleClickCounselingButton}
        className='absolute bottom-24 right-12 z-30 rounded-full bg-gradient-to-r from-sub-color to-main-color p-2'
      >
        <HiPlus color='#fff' className='size-5' />
      </button>
    </>
  )
}
