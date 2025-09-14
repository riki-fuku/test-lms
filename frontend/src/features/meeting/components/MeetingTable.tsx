import Avatar from '@/components/ui/Avatar'
import type { Meeting } from '@/features/meeting/types/Meeting'
import dayjs from 'dayjs'
import { IoPersonSharp } from 'react-icons/io5'

type MeetingTableProps = {
  meetings: Meeting[]
}

export default function MeetingTable({ meetings }: MeetingTableProps) {
  return (
    <>
      {/* 面談履歴テーブル */}
      <table className='w-full'>
        <thead>
          <tr className='h-10 border-y text-text-secondary [&_td]:text-md'>
            <td></td>
            <td className=''>担当コーチ</td>
            <td className=''>日時</td>
            {/* <td className='text-center'>ステータス</td> */}
            {/* <td className='text-center'>面談動画</td> */}
          </tr>
        </thead>
        <tbody>
          {meetings
            .map((meeting, i) => {
              return (
                <tr className='h-10 w-full items-center border-b [&_td]:text-md' key={i}>
                  <td className='px-5 text-center'>{i + 1}</td>
                  <td className=''>
                    <div className='flex items-center gap-2'>
                      <Avatar size='xs'>
                        <IoPersonSharp color='#ffffff' />
                      </Avatar>
                      <span>{meeting.employee?.name}</span>
                    </div>
                  </td>
                  <td className=''>
                    {dayjs(meeting.startDatetime).format('YYYY年MM月DD日(ddd) HH:mm~')}
                  </td>
                  {/* <td className='text-center text-md'>{meeting.status}</td>
                  <td>
                    <RiLink
                      className={cn(
                        'm-auto text-text-secondary',
                        meeting.movie_url && 'text-text-blue-primary',
                      )}
                      size={16}
                    />
                  </td> */}
                </tr>
              )
            })
            .reverse()}
        </tbody>
      </table>
      {meetings.length === 0 && <p>面談履歴がありません</p>}
    </>
  )
}
