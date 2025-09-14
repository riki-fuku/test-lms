import BaseSideBar from '@/components/elements/BaseSideBar'
import { useEmployeeStore } from '@/store/employee-store'
import { BsBook, BsCalendar3, BsChatDots } from 'react-icons/bs'
import { MdHeadsetMic } from 'react-icons/md'
import { PiListBulletsFill } from 'react-icons/pi'
import { RiQuestionFill } from 'react-icons/ri'

export default function SideBarEmployeeCoach() {
  const employee = useEmployeeStore((state) => state.employee)
  const workspaceId = employee?.activeWorkspace.workspaceId ?? ''

  const links = workspaceId
    ? [
        {
          name: '教材',
          link: `/renewal/${workspaceId}/curriculums`,
          icon: <BsBook className='size-5' />,
        },
        {
          name: 'チャット',
          link: `/renewal/employee/${workspaceId}/chat`,
          icon: <BsChatDots className='size-5 -scale-x-100' />,
        },
        {
          name: '面談一覧',
          link: `/renewal/employee/${workspaceId}/meetings`,
          icon: <MdHeadsetMic className='size-5' />,
        },
        {
          name: 'カレンダー',
          link: '/renewal/employee/shift',
          icon: <BsCalendar3 className='size-5' />,
        },
        {
          name: '生徒一覧',
          link: `/renewal/employee/${workspaceId}/users`,
          icon: <PiListBulletsFill className='size-5' />,
        },
        {
          name: 'ヘルプセンター',
          link: `/renewal/${workspaceId}/help`,
          icon: <RiQuestionFill className='size-5' />,
          target: '_blank',
        },
      ]
    : []

  return <BaseSideBar links={links} />
}
