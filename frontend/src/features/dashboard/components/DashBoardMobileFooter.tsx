import { useState } from 'react'
import { BsChatDots, BsClipboardData } from 'react-icons/bs'
import { GoCalendar } from 'react-icons/go'
import { SiChartdotjs } from 'react-icons/si'

type Item = {
  icon: React.ReactNode
  key: string
}

type DashBoardMobileFooterProps = {
  onSelect: (key: string) => void
}

export default function DashBoardMobileFooter({ onSelect }: DashBoardMobileFooterProps) {
  const [selected, setSelected] = useState<string>('learningStats')

  const iconSize = 24
  const items = [
    {
      icon: <BsClipboardData size={iconSize} />,
      key: 'learningStats',
    },
    {
      icon: <SiChartdotjs size={iconSize} />,
      key: 'chart',
    },
    {
      icon: <GoCalendar size={iconSize} />,
      key: 'scheduleNote',
    },
    {
      icon: <BsChatDots size={iconSize} />,
      key: 'chat',
    },
  ]

  const handleClick = (item: Item) => {
    setSelected(item.key)
    onSelect(item.key)
  }

  return (
    <footer className='fixed bottom-0 left-0 z-10 w-full bg-white'>
      <ul className='flex justify-around'>
        {items.map((item) => (
          <li
            className={`cursor-pointer p-5 ${selected === item.key ? 'text-blue-500' : 'text-gray-500'}`}
            key={item.key}
            onClick={() => handleClick(item)}
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </footer>
  )
}
