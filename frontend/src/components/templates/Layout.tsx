'use client'

import EmployeeAdminSideBar from '@/components/elements/EmployeeAdminSideBar'
import EmployeeCSSideBar from '@/components/elements/EmployeeCSSideBar'
import EmployeeCoachSideBar from '@/components/elements/EmployeeCoachSideBar'
import Footer from '@/components/elements/Footer'
import type { HeaderProps } from '@/components/elements/Header'
import Header from '@/components/elements/Header'
import UserSideBar from '@/components/elements/UserSideBar'
import { ACCOUNT_TYPE, EMPLOYEE_ROLE } from '@/constants'
import type { Employee } from '@/features/employee/types'
import { useActorStore } from '@/store/actor-store'

type LayoutProps = {
  children: React.ReactNode
  sidebar?: boolean
  header?: HeaderProps
  footer?: boolean
}

export default function Layout({
  children,
  sidebar = true,
  header = {
    logo: true,
    search: 'textbook',
    actions: {
      notice: true,
      help: true,
    },
  },
  footer = true,
}: LayoutProps) {
  const actor = useActorStore((state) => state.actor)
  const actorType = useActorStore((state) => state.actorType)

  return (
    <>
      <div className='flex h-screen w-full shrink-0 overflow-hidden'>
        {/* サイドバー */}
        {sidebar && (
          <div className='hidden w-72 bg-bg-tertiary lg:block'>
            {actorType === ACCOUNT_TYPE.USER && <UserSideBar />}
            {actorType === ACCOUNT_TYPE.EMPLOYEE && (
              <>
                {(actor as Employee)?.role === EMPLOYEE_ROLE.ADMIN && <EmployeeAdminSideBar />}
                {(actor as Employee)?.role === EMPLOYEE_ROLE.COACH && <EmployeeCoachSideBar />}
                {(actor as Employee)?.role === EMPLOYEE_ROLE.CS && <EmployeeCSSideBar />}
              </>
            )}
          </div>
        )}
        <div id='baseContainer' className='relative flex w-full flex-col overflow-y-auto'>
          {/* ヘッダー */}
          <Header {...header} />
          {/* メインコンテンツ */}
          <main className='my-auto flex-1 justify-center bg-bg-primary lg:px-8 lg:py-12'>
            <div className='mx-auto h-full rounded'>{children}</div>
          </main>
          {/* フッター */}
          {footer && (
            <div className='w-full'>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
