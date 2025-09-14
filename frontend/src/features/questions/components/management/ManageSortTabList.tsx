import ManageSortTab from '@/features/questions/components/management/ManageSortTab'
import manageQuestionTab from '@/features/questions/constants/manageQuestionTab'
import type { QuestionTab } from '@/features/questions/types/QuestionTab'

type SortTabListProps = {
  needsActionCount: number
  waitingUserReplyCount: number
  selectedTab: QuestionTab
  onTabClick: (tab: QuestionTab) => void
}

export default function SortTabList({
  needsActionCount,
  waitingUserReplyCount,
  selectedTab,
  onTabClick,
}: SortTabListProps) {
  const handleClick = (tab: QuestionTab) => {
    onTabClick(tab)
  }

  return (
    <ul className='flex'>
      {manageQuestionTab.getAll().map((tab) => (
        <li
          key={tab.id}
          className='w-28 cursor-pointer text-center'
          onClick={() => handleClick(tab)}
        >
          <ManageSortTab
            tab={tab.name}
            selected={selectedTab === tab}
            {...(tab.id === manageQuestionTab.NEEDS_ACTION.id && { count: needsActionCount })}
            {...(tab.id === manageQuestionTab.WAITING_USER_REPLY.id && {
              count: waitingUserReplyCount,
            })}
          />
        </li>
      ))}
    </ul>
  )
}
