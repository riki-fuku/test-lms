import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import useFetchUser from '@/features/user/hooks/useFetchUser'
import { useEmployeeStore } from '@/store/employee-store'
import dayjs from 'dayjs'
import Link from 'next/link'
import { IoPersonSharp } from 'react-icons/io5'

type UserProfileProps = {
  workspaceId: string
  userId: string
}

export default function UserProfile({ userId, workspaceId }: UserProfileProps) {
  const employee = useEmployeeStore((state) => state.employee)
  const role = employee?.role

  const { data, isLoading } = useFetchUser(workspaceId, userId, { revalidateOnFocus: false })
  const user = data

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='flex h-full flex-col justify-between gap-5'>
      <div className='flex items-center gap-2'>
        <Avatar className='size-32 shrink-0'>
          {user?.avatar ? (
            <Image src={user.avatar} alt='Avatar' fill />
          ) : (
            <IoPersonSharp color='#ffffff' size={90} />
          )}
        </Avatar>

        <div className='flex flex-col gap-5'>
          <div className='text-sm'>
            <table>
              <tbody>
                <tr>
                  <td className='pr-4 text-text-secondary'>最終ログイン</td>
                  <td>
                    {user?.lastLoginAt
                      ? dayjs(user?.lastLoginAt).format('YYYY/MM/DD HH:mm')
                      : '未ログイン'}
                  </td>
                </tr>
                <tr>
                  <td className='pr-4 text-text-secondary'>アクティブ状態</td>
                  <td>{user?.isRecentlyActive ? 'アクティブ' : '非アクティブ'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='flex h-full items-center justify-center gap-3'>
            <p className='text-3xl !leading-none'>{user?.name}</p>
            <div className='text-text-secondary'>
              <p>
                <span className='text-md '>ニックネーム : </span>
                {user?.nickname}
              </p>
              <p>
                <span className='text-md '>email : </span>
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start gap-12 text-sm'>
        <table className='shrink-0 text-left'>
          <tbody>
            {role === 'coach' && (
              <tr>
                <td className='min-w-24'>受講状態</td>
                <td>{user?.status?.label}</td>
              </tr>
            )}
            <tr>
              <td className='min-w-24'>受講開始日</td>
              <td>{dayjs(user?.startingDate).format('YYYY年MM月DD日')}</td>
            </tr>
            <tr>
              <td className='min-w-24'>卒業日</td>
              <td>{dayjs(user?.graduateDate).format('YYYY年MM月DD日')}</td>
            </tr>
            <tr>
              <td>契約プラン</td>
              <td>{user?.plan.name}</td>
            </tr>
            <tr>
              <td>生年月日</td>
              <td>
                {user?.birthDate ? dayjs(user?.birthDate).format('YYYY年MM月DD日') : '未設定'}
              </td>
            </tr>
            {role === 'coach' && (
              <tr>
                <td className='min-w-24'>Pro合格判定</td>
                <td>{user?.proCertification ? 'PRO' : '-'}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='flex-1'>
          <div className='flex items-center justify-between gap-12'>
            <p>自己紹介</p>
            {(role === 'admin' || role === 'coach') && (
              <Link
                href={`/renewal/employee/${workspaceId}/backlog/${userId}`}
                className='text-blue-500 underline'
              >
                バックログページリンク
              </Link>
            )}
          </div>
          <p className='mt-2 text-text-secondary'>{user?.introduction}</p>
        </div>
      </div>
    </div>
  )
}
