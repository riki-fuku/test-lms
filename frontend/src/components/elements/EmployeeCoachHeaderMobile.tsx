'use client'

import Avatar from '@/components/elements/Avatar'
import Image from '@/components/elements/Image'
import cn from '@/hooks/cn'
import { useEmployeeStore } from '@/store/employee-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BsBook, BsCalendar3, BsChatDots } from 'react-icons/bs'
import { FaBell, FaQuestionCircle } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GoSearch } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import { MdHeadsetMic } from 'react-icons/md'
import { PiListBulletsFill } from 'react-icons/pi'
import { RiHome4Line, RiQuestionFill } from 'react-icons/ri'

type SlideMenuProps = {
  onClose: () => void
}

const SlideMenu = ({ onClose }: SlideMenuProps) => {
  const pathName = usePathname()
  const employee = useEmployeeStore((state) => state.employee)
  const workspaceId = employee?.activeWorkspace.workspaceId ?? ''

  const navigationLinks = [
    {
      label: '教材',
      link: `/renewal/${workspaceId}/curriculums`,
      icon: <BsBook className='size-5' />,
    },
    {
      label: 'チャット',
      link: `/renewal/employee/${workspaceId}/chat`,
      icon: <BsChatDots className='size-5 -scale-x-100' />,
    },
    {
      label: '面談一覧',
      link: `/renewal/employee/${workspaceId}/meetings`,
      icon: <MdHeadsetMic className='size-5' />,
    },
    {
      label: 'カレンダー',
      link: '/renewal/employee/shift',
      icon: <BsCalendar3 className='size-5' />,
    },
    {
      label: '生徒一覧',
      link: `/renewal/employee/${workspaceId}/users`,
      icon: <PiListBulletsFill className='size-5' />,
    },
    {
      label: 'ヘルプセンター',
      link: `/renewal/${workspaceId}/help`,
      icon: <RiQuestionFill className='size-5' />,
      target: '_blank',
    },
  ]

  const footerLinks = [
    {
      label: 'ヘルプ',
      link: `/renewal/${workspaceId}/help`,
      icon: <FaQuestionCircle size={30} />,
    },
    {
      label: '設定',
      link: `/renewal/employee/${workspaceId}/settings/profile`,
      icon: <FiSettings size={30} />,
    },
  ]

  return (
    <div className='absolute left-0 top-0 z-30 flex h-screen w-screen animate-slideInLeft bg-text-secondary'>
      <div className='w-1/6 bg-text-primary  py-4 text-center'>
        <button onClick={() => onClose()}>
          <IoClose className='text-white' size={30} />
        </button>
      </div>
      <div className='relative w-full px-4 py-8'>
        <div className='mb-10 flex flex-col items-center gap-2'>
          <div className='size-[100px] overflow-hidden rounded-full'>
            <Image
              className='object-cover'
              src={employee?.avatar ?? ''}
              width='100'
              height='100'
              alt='プロフィール画像'
            />
          </div>
          <p className='text-xl text-white'>
            {`${employee?.lastName} ${employee?.firstName}`}
            <span className='ml-2 text-sm'>{employee?.nickname}</span>
          </p>
        </div>
        <div>
          {navigationLinks.map((item, key) => {
            return (
              <div
                key={key}
                className={cn(
                  'px-2 py-4',
                  pathName === item.link && 'bg-gradient-to-r from-sub-color to-main-color',
                )}
              >
                <Link href={item.link} className='flex items-center gap-x-2 font-bold text-white'>
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            )
          })}
        </div>
        <div className='absolute bottom-4 right-4 flex gap-x-4'>
          {footerLinks.map((item, key) => {
            return (
              <Link
                key={key}
                href={item.link}
                className='flex items-center gap-x-2 font-bold text-white'
              >
                {item.icon}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function HeaderMobileEmployeeCoach() {
  const pathName = usePathname()
  const iconSize = 20
  const [showSlideMenu, setShowSlideMenu] = useState(false)

  const onClose = () => {
    setShowSlideMenu(false)
  }

  const pageTitle = () => {
    switch (pathName) {
      case '/curriculums/':
        return {
          title: '教材',
          icon: <BsBook size={iconSize} />,
        }
      case '/chat/':
        return {
          title: 'チャット',
          icon: <BsChatDots size={iconSize} />,
        }
      case '/meetings/':
        return {
          title: '面談一覧',
          icon: <MdHeadsetMic size={iconSize} />,
        }
      case '/calendar/':
        return {
          title: 'カレンダー',
          icon: <BsCalendar3 size={iconSize} />,
        }
      case '/users/':
        return {
          title: '生徒一覧',
          icon: <PiListBulletsFill size={iconSize} />,
        }
      case '/help/':
        return {
          title: 'ヘルプセンター',
          icon: <RiQuestionFill size={iconSize} />,
        }
      default:
        return {
          title: '未設定',
          icon: <RiHome4Line size={iconSize} />,
        }
    }
  }

  const RightContents = () => {
    return (
      <>
        <div className='p-3'>
          <GoSearch size={24} className='inset-2 text-gray-300' />
        </div>
        <div className='p-3'>
          <Avatar size='sm' className='col-3'>
            <FaBell color='#ffffff' />
          </Avatar>
        </div>
      </>
    )
  }

  return (
    <>
      <header className='relative grid grid-cols-3 border-b border-primary px-2'>
        {showSlideMenu && <SlideMenu onClose={onClose} />}
        <div className='col-span-2 flex items-center'>
          <div className='cursor-pointer p-3' onClick={() => setShowSlideMenu(true)}>
            <GiHamburgerMenu size={20} />
          </div>
          {/* page title */}
          <div className='ml-2 flex items-center gap-1 text-normalText'>
            {pageTitle().icon}
            <p>{pageTitle().title}</p>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <RightContents />
        </div>
      </header>
    </>
  )
}
