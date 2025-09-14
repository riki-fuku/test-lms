import Button from '@/components/ui/Button'
import type { FetchMeetingsQuery } from '@/features/meeting/api/fetchMeetings'
import MeetingStatusClass from '@/features/meeting/constants/MeetingStatusClass'
import { useFetchMeetingsInfinite } from '@/features/meeting/hooks/useFetchMeetings'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import { MdExpandMore } from 'react-icons/md'

type MeetingHistoryTableProps = {
  workspaceId: string
  employeeId?: string
  userId?: string
  className?: string
}

export default function MeetingHistoryTable({
  employeeId,
  workspaceId,
  userId,
}: MeetingHistoryTableProps) {
  const [currentYearMonth, setCurrentYearMonth] = useState<Dayjs | null>(dayjs())

  const query = useMemo(() => {
    const query: FetchMeetingsQuery = {
      status: MeetingStatusClass.IMPLEMENTED.id,
      sort: 'asc',
    }

    if (employeeId) {
      query.employeeId = employeeId
    }

    if (userId) {
      query.userId = userId
    }

    if (currentYearMonth) {
      // 月内の面談を取得
      query.startDatetime = currentYearMonth.format('YYYY-MM-01 00:00:00')
      query.endDatetime = currentYearMonth.endOf('month').format('YYYY-MM-DD 23:59:59')
    }

    return query
  }, [currentYearMonth, employeeId, userId])

  const { data, isLoading, setSize } = useFetchMeetingsInfinite(workspaceId, query)

  const meetings = useMemo(() => {
    return data?.flatMap((page) => page.data) || []
  }, [data])

  const meta = useMemo(() => data?.[data.length - 1]?.meta, [data])

  const canFetchMore = useMemo(() => {
    return meta && meta.currentPage < meta.lastPage
  }, [meta])

  const handleFetchMore = useCallback(() => {
    if (canFetchMore) {
      setSize((prev) => prev + 1)
    }
  }, [setSize, canFetchMore])

  return (
    <div className='flex flex-col gap-5'>
      {/* 面談回数 */}
      <div>
        <p>面談回数</p>
        <p>{meta?.total}</p>
      </div>

      {/* 検索 */}
      <div className='flex items-center gap-2'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='年月'
            views={['month', 'year']}
            value={currentYearMonth}
            onChange={(date) => setCurrentYearMonth(date)}
          />
        </LocalizationProvider>
        <Button intent='secondary' onClick={() => setCurrentYearMonth(null)}>
          全期間
        </Button>
      </div>

      {/* 面談履歴 */}
      <div className='h-96 grow overflow-y-auto'>
        <table className='size-full border-b text-center'>
          <thead className='sticky -top-px z-10 bg-white'>
            <tr className='h-10 border-y text-text-secondary [&>td]:px-5'>
              <td>名前</td>
              <td>面談回数</td>
              <td className='text-left'>日時</td>
              {/* <td>ステータス</td> */}
              <td>面談メモ</td>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => {
              return (
                <tr className='h-10 border-b hover:bg-bg-hover-primary' key={index}>
                  <td>{meeting.user?.name}</td>
                  <td>
                    {meeting.meetingCount} / {meeting.user?.maxMeetings}回目
                  </td>
                  <td className='px-5 text-left'>
                    {dayjs(meeting.startDatetime).format('YYYY年MM月DD日(ddd) HH:mm~')}
                  </td>
                  {/* <td>{meeting.status.name}</td> */}
                  <td>
                    <Link href={`/renewal/employee/${workspaceId}/meetings/${meeting.id}/memo`}>
                      <HiPencil className='m-auto cursor-pointer text-blue-500' size={20} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {isLoading && <p>Loading...</p>}

        {canFetchMore && (
          <div className='border-b p-2 text-text-secondary'>
            <div className='flex w-fit cursor-pointer items-center' onClick={handleFetchMore}>
              <MdExpandMore size={20} />
              <p className='text-md'>もっと見る</p>
            </div>
          </div>
        )}

        {!isLoading && meetings.length === 0 && <p>面談履歴がありません</p>}
      </div>
    </div>
  )
}
