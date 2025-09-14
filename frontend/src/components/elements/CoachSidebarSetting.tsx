import { useEmployeeStore } from '@/store/employee-store'
import Link from 'next/link'
import { FiSettings } from 'react-icons/fi'

export default function CoachSidebarSetting() {
  type Sidebar = {
    title: string
    url: string
  }

  const { employee } = useEmployeeStore((state) => state)
  const workspaceId = employee?.activeWorkspace.workspaceId ?? ''

  const sidebars: Sidebar[] = workspaceId
    ? [
        {
          title: 'プロフィール設定',
          url: '/renewal/employee/' + workspaceId + '/settings/profile',
        },
        {
          title: 'カレンダー設定',
          url: '/renewal/employee/' + workspaceId + '/settings/calendar',
        },
      ]
    : []

  return (
    <>
      <aside className='min-w-64 p-4 lg:w-1/6'>
        <div className='mb-10 flex items-center gap-2 font-bold'>
          <FiSettings className='text-2xl' />
          <p className='text-2xl'>設定</p>
        </div>
        <nav className='m-auto'>
          <ul>
            {sidebars.map((sidebar, index) => (
              <Link href={sidebar.url} key={index}>
                <li className='px-5 py-4 hover:bg-bg-hover-primary'>{sidebar.title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
