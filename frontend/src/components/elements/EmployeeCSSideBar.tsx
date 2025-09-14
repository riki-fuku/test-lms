import BaseSideBar from '@/components/elements/BaseSideBar'
import Image from '@/components/elements/Image'
import { useEmployeeStore } from '@/store/employee-store'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { BsBook, BsCalendar3, BsCheck } from 'react-icons/bs'
import { HiDocumentText, HiOutlineMail } from 'react-icons/hi'
import { RiQuestionFill } from 'react-icons/ri'

export default function SideBarEmployeeCS() {
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
          name: 'ユーザー一覧',
          link: `/renewal/employee/${workspaceId}/cs/users`,
          icon: <BsCalendar3 className='size-5' />,
        },
        {
          name: '確認テスト一覧',
          link: `/renewal/employee/${workspaceId}/cs/tests`,
          icon: <BsCheck className='size-5' />,
        },
        {
          name: '質問掲示板',
          link: `/renewal/employee/${workspaceId}/cs/questions/management`,
          icon: (
            <div className='relative size-5'>
              <Image src='/images/qa_icon.png' fill alt='Q&Aアイコン' />
            </div>
          ),
        },
        {
          name: '生徒成績管理',
          link: `/renewal/employee/${workspaceId}/admin/management/user-exams`,
          icon: <BiBarChartAlt2 className='size-5' />,
        },
        {
          name: '教材管理',
          link: `/renewal/employee/${workspaceId}/admin/management/curriculums`,
          icon: <BsBook className='size-5' />,
        },
        {
          name: '申請一覧',
          link: `/renewal/employee/${workspaceId}/cs/applications`,
          icon: <HiDocumentText className='size-5' />,
        },
        {
          name: '申請管理',
          link: `/renewal/employee/${workspaceId}/cs/application-interviewers`,
          icon: <HiOutlineMail className='size-5' />,
        },
        {
          name: 'ヘルプ管理',
          link: `/renewal/employee/${workspaceId}/admin/management/help/`,
          icon: <RiQuestionFill className='size-5' />,
        },
      ]
    : []

  return <BaseSideBar links={links} />
}
