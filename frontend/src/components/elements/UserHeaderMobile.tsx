'use client'

import Avatar from '@/components/elements/Avatar'
import Image from '@/components/elements/Image'
import cn from '@/hooks/cn'
import { useUserStore } from '@/store/user-store'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BsBook, BsGear } from 'react-icons/bs'
import { FaBell, FaQuestionCircle } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GoSearch } from 'react-icons/go'
import { HiPlus } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { LuBookOpen } from 'react-icons/lu'
import { MdHeadsetMic, MdOutlineTimer } from 'react-icons/md'
import { PiChatsCircle } from 'react-icons/pi'
import { RiHome4Line } from 'react-icons/ri'
import { VscCalendar } from 'react-icons/vsc'

type SlideMenuProps = {
  onClose: () => void
}

const SlideMenu = ({ onClose }: SlideMenuProps) => {
  const pathName = usePathname()
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''

  const navigationLinks = [
    {
      label: 'ホーム',
      link: `/renewal/user/${workspaceId}/dashboard`,
      icon: <RiHome4Line size={20} />,
    },
    {
      label: '教材',
      link: `/renewal/${workspaceId}/curriculums`,
      icon: <LuBookOpen size={20} />,
    },
    {
      label: '質問掲示板',
      link: `/renewal/${workspaceId}/questions`,
      icon: <PiChatsCircle size={20} />,
    },
    {
      label: '面談一覧',
      link: `/renewal/user/${workspaceId}/meetings`,
      icon: <MdHeadsetMic size={20} />,
    },
    {
      label: 'カレンダー',
      link: `/renewal/user/${workspaceId}/calendar`,
      icon: <VscCalendar size={20} />,
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
      link: `/renewal/user/${workspaceId}/settings/profile`,
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
              src={user?.avatar ?? ''}
              width='100'
              height='100'
              alt='プロフィール画像'
            />
          </div>
          <p className='text-xl text-white'>
            {`${user?.lastName} ${user?.firstName}`}
            <span className='ml-2 text-sm'>{user?.nickname}</span>
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

export default function HeaderMobile() {
  const pathName = usePathname()
  const iconSize = 20
  const [showSlideMenu, setShowSlideMenu] = useState(false)

  const onClose = () => {
    setShowSlideMenu(false)
  }

  const pageTitle = () => {
    // questions/posts/:id
    if (pathName.match(/^\/questions\/posts\/(\d+)\/?$/)) {
      return {
        title: `質問掲示板`,
        icon: (
          <div className='relative size-5'>
            <NextImage
              src='/images/question_and_answer_icon.png'
              alt='question and answer_icon'
              fill
            />
          </div>
        ),
      }
    }

    // settings以下のパスとマッチさせる
    if (pathName.includes('/settings')) {
      return {
        title: '設定',
        icon: <BsGear size={iconSize} />,
      }
    }

    // curriculums以下のパスとマッチさせる
    if (pathName.includes('/curriculums')) {
      return {
        title: '教材',
        icon: <BsBook size={iconSize} />,
      }
    }

    switch (pathName) {
      case '/dashboard/':
        return {
          title: 'ホーム',
          icon: <RiHome4Line size={iconSize} />,
        }
      case '/timers/':
        return {
          title: 'タイマー',
          icon: <MdOutlineTimer size={iconSize} />,
        }
      case '/curriculums/':
        return {
          title: 'カリキュラム',
          icon: <RiHome4Line size={iconSize} />,
        }
      case '/question/':
        return {
          title: '質問',
          icon: <RiHome4Line size={iconSize} />,
        }
      case '/question/posts/':
        return {}
      case '/meeting/':
        return {
          title: 'ミーティング',
          icon: <RiHome4Line size={iconSize} />,
        }
      case '/meetings/':
        return {
          title: '面談一覧',
          icon: <MdHeadsetMic size={iconSize} />,
        }
      case '/calendar/':
        return {
          title: 'カレンダー',
          icon: <RiHome4Line size={iconSize} />,
        }
      case '/questions/':
        return {
          title: '質問掲示板',
          icon: (
            <div className='relative size-5'>
              <NextImage
                src='/images/question_and_answer_icon.png/'
                alt='question_and_answer_icon'
                fill
              />
            </div>
          ),
        }
      default:
        return {
          title: '未設定',
          icon: <RiHome4Line size={iconSize} />,
        }
    }
  }

  const QuestionPageRightContents = () => {
    return (
      <Link href='/questions/create'>
        <Avatar size='sm' className='col-3 bg-gradient-to-r from-sub-color to-main-color'>
          <HiPlus color='#fff' className='size-5' />
        </Avatar>
      </Link>
    )
  }

  const RightContents = () => {
    // /questions配下のパス
    if (pathName.includes('/questions')) {
      return <QuestionPageRightContents />
    } else {
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
