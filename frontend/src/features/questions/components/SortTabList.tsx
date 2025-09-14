import SortTab from '@/features/questions/components/SortTab'
import questionTab from '@/features/questions/constants/questionTab'
import type { QuestionTab } from '@/features/questions/types/QuestionTab'

type SortTabListProps = {
  selectedTab: QuestionTab
  onTabClick: (tab: QuestionTab) => void
}

export default function SortTabList({ selectedTab, onTabClick }: SortTabListProps) {
  const handleClick = (tab: QuestionTab) => {
    onTabClick(tab)
  }

  return (
    <ul className='flex'>
      {questionTab.getAll().map((tab) => (
        <li
          key={tab.id}
          className='w-1/6 cursor-pointer text-center'
          onClick={() => handleClick(tab)}
        >
          <SortTab tab={tab.name} selected={selectedTab === tab} />
        </li>
      ))}
    </ul>
  )
}
