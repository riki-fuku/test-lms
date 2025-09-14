'use client'

import Image from '@/components/elements/Image'
import useGoTopPage from '@/hooks/userGoTopPage'
import Link from 'next/link'

interface BaseSideBarProps {
  links: {
    name: string
    link: string
    icon: React.ReactNode
    target?: string
  }[]
}

export default function BaseSideBar({ links }: BaseSideBarProps) {
  const { goTopPage } = useGoTopPage()

  const handleClickLogo = () => {
    goTopPage()
  }

  return (
    <div className='h-full w-72 bg-bg-tertiary px-8 py-5'>
      <div className='relative flex h-6 w-full items-center gap-2'>
        <div className='cursor-pointer' onClick={handleClickLogo}>
          <Image src='/images/logo_white.svg' alt='ロゴ' width={200} height={17} />
        </div>
      </div>
      <div className='mt-8 flex flex-col gap-8 font-bold'>
        {links.map((link, index) => (
          <Link
            className='flex items-center gap-4 text-white'
            href={link.link}
            key={index}
            target={link.target}
          >
            <p>{link.icon}</p>
            <p>{link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
