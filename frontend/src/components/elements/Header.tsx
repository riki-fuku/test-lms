'use client'

import Avatar from '@/components/elements/Avatar'
import EmployeeCoachHeaderMobile from '@/components/elements/EmployeeCoachHeaderMobile'
import Image from '@/components/elements/Image'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import { ACCOUNT_TYPE, EMPLOYEE_ROLE } from '@/constants'
import logout from '@/features/auth/api/logout'
import CurriculumSearchInput from '@/features/curriculum/components/CurriculumSearchInput'
import type { Employee } from '@/features/employee/types'
import RenewalTimer from '@/features/timer/components/RenewalTimer'
import useDisclosure from '@/hooks/useDisclosure'
import useGoTopPage from '@/hooks/userGoTopPage'
import { useActorStore } from '@/store/actor-store'
import { useUserStore } from '@/store/user-store'
import { useEmployeeStore } from '@/store/employee-store'
import type { ActorType } from '@/type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { BsGear } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { IoPersonSharp } from 'react-icons/io5'

export type HeaderProps = {
  logo: boolean
  search?: 'textbook' | 'help'
  actions: {
    notice: boolean
    help: boolean
  }
}

export default function Header({
  logo = true,
  search,
  actions = {
    notice: true,
    help: true,
  },
}: HeaderProps) {
  const router = useRouter()
  const { actor, actorType, setActor, setActorType } = useActorStore((state) => state)
  const workspaceId = actor?.activeWorkspace.workspaceId ?? ''
  const { goTopPage } = useGoTopPage()
  const userMenu = useDisclosure()

  const helpPath = useMemo(() => {
    return `/renewal/${workspaceId}/help`
  }, [workspaceId])

  const settingPath = useMemo(() => {
    return `/renewal/${actorType}/${workspaceId}/settings/profile`
  }, [actorType, workspaceId])

  const handleClickLogout = async () => {
    await logout({ guard_type: actorType as ActorType })
    setActor(null)
    setActorType(null)
    // TODO: useUserStore, useEmployeeStoreが使われなくなったら削除
    useUserStore.getState().setUser(null)
    useEmployeeStore.getState().setEmployee(null)
    router.push('/renewal/user/login')
  }

  return (
    <>
      <div className='shrink-0 lg:hidden'>
        {actorType === ACCOUNT_TYPE.EMPLOYEE &&
          (actor as Employee)?.role === EMPLOYEE_ROLE.COACH && <EmployeeCoachHeaderMobile />}
      </div>
      <div className='hidden shrink-0 lg:grid'>
        <header className='sticky top-0 z-10 grid h-14 shrink-0 grid-cols-3 items-center border bg-white px-5'>
          {/* ロゴ */}
          <div>
            {logo && (
              <div className='relative h-5 w-52 cursor-pointer' onClick={goTopPage}>
                {actor &&
                  (MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
                    <Image src='/images/mazidesign_logo.svg' alt='ロゴ' fill priority />
                  ) : (
                    <Image src='/images/logo.svg' alt='ロゴ' fill priority />
                  ))}
              </div>
            )}
          </div>

          {/* 検索バー */}
          <div className='col-auto'>
            {search === 'textbook' && <CurriculumSearchInput workspaceId={workspaceId} />}
          </div>

          {/* ユーザーアクション */}
          <div className='flex h-full items-center justify-end'>
            {actions && (
              <div className='flex gap-7'>
                {actions.notice && actorType === ACCOUNT_TYPE.USER && <RenewalTimer />}
                {actions.help && (
                  <Link href={helpPath} target='_blank'>
                    <Avatar className='cursor-pointer' size='sm'>
                      <FaQuestion color='#ffffff' />
                    </Avatar>
                  </Link>
                )}
              </div>
            )}

            {/* ユーザメニュー */}
            {actor && (
              <>
                {/* divider */}
                <div className='mx-4 h-full border-l'></div>
                <div className='relative'>
                  <div className='flex cursor-pointer items-center gap-1' onClick={userMenu.toggle}>
                    <Avatar size='sm'>
                      {actor && actor.avatar ? (
                        <Image src={actor.avatar} alt='プロフィール' fill />
                      ) : (
                        <IoPersonSharp color='#ffffff' />
                      )}
                    </Avatar>
                    {actor && <p>{actor.name}</p>}
                  </div>

                  {userMenu.isOpen && (
                    <div className='absolute right-0 top-14 z-10 w-48 rounded-md bg-white shadow-md [&>div]:border-b'>
                      {MAZIDESIGN_WORKSPACE_NAME !== actor?.activeWorkspace.workspace?.name && (
                        <Link
                          href={settingPath}
                          target='_blank'
                          className='flex cursor-pointer items-center gap-2 px-5 py-3'
                        >
                          <BsGear />
                          <p>設定</p>
                        </Link>
                      )}
                      <div
                        className='flex cursor-pointer items-center gap-2 px-5 py-3'
                        onClick={handleClickLogout}
                      >
                        <GrLogout />
                        <p>ログアウト</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  )
}
