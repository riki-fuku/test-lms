import Link from 'next/link'
import { FiSettings } from 'react-icons/fi'

export default function SidebarSetting({ workspaceId }: { workspaceId: string }) {
  type Sidebar = {
    title: string
    url: string
  }

  const sidebars: Sidebar[] = [
    {
      title: 'プロフィール設定',
      url: `/renewal/user/${workspaceId}/settings/profile`,
    },
    // {
    //   title: 'アカウント設定',
    //   url: `/renewal/user/${workspaceId}/settings/account`,
    // },
    {
      title: '習慣設定',
      url: `/renewal/user/${workspaceId}/settings/periodic-schedule`,
    },
    {
      title: '通知設定',
      url: `/renewal/user/${workspaceId}/settings/notification`,
    },
  ]
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
