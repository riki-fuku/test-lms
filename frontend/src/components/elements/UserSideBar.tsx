import BaseSideBar from '@/components/elements/BaseSideBar'
import Image from '@/components/elements/Image'
import { useUserStore } from '@/store/user-store'
import { BsBook, BsCalendar3 } from 'react-icons/bs'
import { MdHeadsetMic, MdManageAccounts } from 'react-icons/md'
import { RiHome4Line, RiQuestionFill } from 'react-icons/ri'

export default function UserSideBar() {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''

  const links = workspaceId
    ? [
        {
          name: 'ホーム',
          link: `/renewal/user/${workspaceId}/dashboard`,
          icon: <RiHome4Line className='size-5' />,
        },
        {
          name: '教材',
          link: `/renewal/${workspaceId}/curriculums`,
          icon: <BsBook className='size-5' />,
        },
        {
          name: '質問掲示板',
          link: `/renewal/${workspaceId}/questions`,
          icon: <Image src='/images/qa_icon.png' width={20} height={20} alt='Q&Aアイコン' />,
        },
        {
          name: '面談一覧',
          link: `/renewal/user/${workspaceId}/meetings`,
          icon: <MdHeadsetMic className='size-5' />,
        },
        {
          name: 'カレンダー',
          link: `/renewal/user/${workspaceId}/schedule-note`,
          icon: <BsCalendar3 className='size-5' />,
        },
        {
          name: 'ヘルプセンター',
          link: `/renewal/${workspaceId}/help`,
          icon: <RiQuestionFill className='size-5' />,
          target: '_blank',
        },
        {
          name: 'タスク管理',
          link: `/renewal/user/${workspaceId}/backlog/${user?.id}`,
          icon: <MdManageAccounts className='size-5' />,
        },
      ]
    : []

  return <BaseSideBar links={links} />
}
