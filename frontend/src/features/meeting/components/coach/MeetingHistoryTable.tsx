// import type { FilterOptions, SortOptions } from '@/features/meeting/types/CoachMeetingListTypes'
import cn from '@/hooks/cn'

const Header = () => {
  const gridChildStyle = 'h-full px-5 flex items-center'
  return (
    <div className='flex h-10 items-center text-text-secondary'>
      <div className={cn('h-full w-10 justify-center border-r border-t', gridChildStyle)}></div>
      <div className='grid h-10 w-full grid-cols-7 items-center justify-items-stretch overflow-hidden rounded border-t text-md [&:last-child]:border-b [&>*:last-child]:border-0 [&>*]:border-r'>
        <div className={cn('col-span-2 justify-start gap-1', gridChildStyle)}>
          <p>生徒名</p>
        </div>
        <div className={cn('col-span-2 justify-start', gridChildStyle)}>
          <p>日時</p>
        </div>
        <div className={cn('justify-center', gridChildStyle)}>
          <p>面談回数</p>
        </div>
        <div className={cn('justify-center', gridChildStyle)}>
          <p>ステータス</p>
        </div>
        <div className={cn('justify-center', gridChildStyle)}>
          <div className='relative flex flex-col justify-center'>
            <p>面談メモ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MeetingHistoryTable({ coachId }: { coachId: string }) {
  // const { data, isLoading } = useFetchMeetings({
  //   coach_id: coachId,
  //   status: MeetingStatusClass.IMPLEMENTED.id,
  // })
  // const sortHistories = useCallback((meetings: Meeting[]): Meeting[] => {
  //   const sortedHistories = [...meetings]
  //   // 最新順に並び変える
  //   sortedHistories.sort((a, b) =>
  //     dayjs(a.startDatetime).isBefore(dayjs(b.startDatetime)) ? 1 : -1,
  //   )
  //   return sortedHistories
  // }, [])
  // const meetings = useMemo(() => {
  //   return sortHistories(data ?? [])
  // }, [data, sortHistories])
  // if (isLoading) return <div>loading...</div>
  // return (
  //   <>
  //     <div className='mb-4 flex items-center justify-between gap-5'>
  //       <div className='flex gap-2'>
  //       </div>
  //     </div>
  //     <Header />
  //     <div className='flex flex-col'>
  //       {meetings.length === 0 && <div>面談履歴がありません</div>}
  //       {meetings.map((meeting, index) => (
  //         <HistoryItem
  //           key={index}
  //           meeting={meeting}
  //         />
  //       ))}
  //     </div>
  //   </>
  // )
}
