import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import useFetchCurriculumStats from '@/features/curriculum/hooks/useFetchCurriculumStats'
import { useUserStore } from '@/store/user-store'
import { BsEye } from 'react-icons/bs'
import { CgTimer } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { GrFlag } from 'react-icons/gr'

export default function DashBoardProfile() {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const userId = user?.id ?? ''
  const { data: curriculumStats } = useFetchCurriculumStats(workspaceId, { userId })

  if (!user) return null

  return (
    <div className='flex justify-between pb-3 lg:border-b'>
      <div className='hidden items-center gap-3 lg:flex'>
        {user.avatar ? (
          <Avatar size='lg'>
            <Image src={user.avatar} alt={user.name} fill />
          </Avatar>
        ) : (
          <FaUserCircle className='fill-text-secondary' size={68} />
        )}
        <div className='flex flex-col'>
          <div className='flex items-end gap-1'>
            <p className='text-2xl'>
              {user.lastName} {user.firstName}
            </p>
            <p>さん</p>
          </div>
        </div>
      </div>

      <div className='flex w-full items-center gap-2.5 lg:w-fit'>
        <div className='flex flex-1 items-center justify-center gap-2 rounded bg-bg-primary p-3'>
          <div className='flex size-10 items-center justify-center rounded-full bg-bg-tertiary'>
            <BsEye className='text-white' size={24} />
          </div>
          <div className='flex flex-col'>
            <p className='text-2xl'>{curriculumStats?.sectionViewed}</p>
            <div className='text-xs'>教材閲覧数</div>
          </div>
        </div>

        <div className='flex flex-1 items-center justify-center gap-2 rounded bg-bg-primary p-3'>
          <div className='flex size-10 items-center justify-center rounded-full bg-bg-tertiary'>
            <GrFlag className='text-white' size={16} />
          </div>
          <div className='flex flex-col'>
            <p className='text-2xl'>{curriculumStats?.passedSectionsCount}</p>
            <div className='text-xs'>教材完走数</div>
          </div>
        </div>

        <div className='flex flex-1 items-center justify-center gap-2 rounded bg-bg-primary p-3'>
          <div className='flex size-10 items-center justify-center rounded-full bg-bg-tertiary'>
            <CgTimer className='text-white' size={24} />
          </div>
          <div className='flex flex-col'>
            <p className='text-2xl'>{curriculumStats?.totalStudyTime}</p>
            <div className='text-xs'>総学習時間</div>
          </div>
        </div>
      </div>
    </div>
  )
}
