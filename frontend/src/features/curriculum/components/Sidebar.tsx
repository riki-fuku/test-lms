import ProgressBar from '@/components/ui/ProgressBar'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import ChapterNavList from '@/features/curriculum/components/ChapterNavList'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import useGoTopPage from '@/hooks/userGoTopPage'
import { useActorStore } from '@/store/actor-store'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5'

type SidebarProps = {
  workspaceId: string
  curriculum: Curriculum
}

export default function Sidebar({ workspaceId, curriculum }: SidebarProps) {
  const { goTopPage } = useGoTopPage()
  const { actor } = useActorStore((state) => state)

  return (
    <div className='flex h-screen w-full flex-col gap-5 bg-white lg:w-80'>
      <div className='shrink-0 cursor-pointer p-4'>
        <div className='hidden lg:block'>
          {actor &&
            (MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
              <Image
                src='/images/mazidesign_logo.png'
                alt='ロゴ'
                width={228}
                height={20}
                onClick={() => goTopPage()}
              />
            ) : (
              <Image
                src='/images/estra_logo_coachtech_lms_black.svg'
                alt='ロゴ'
                width={228}
                height={20}
                onClick={() => goTopPage()}
              />
            ))}
        </div>
        {/* カリキュラムタイトル */}
        <div className='mt-0 lg:mt-10'>
          <div className='flex items-center justify-between'>
            <div className='text-lg font-bold'>{curriculum?.title}</div>
            <Link href={`/renewal/${workspaceId}/curriculums`} className='cursor-pointer'>
              <div className='flex'>
                <IoArrowBackCircle className='mr-1' />
                <span className='align-bottom text-xs underline'>教材一覧へ</span>
              </div>
            </Link>
          </div>
        </div>
        {/* プログレスバー */}
        <div className='mt-5'>
          <ProgressBar progress={curriculum.progress} showProgressNum />
        </div>
      </div>
      {/* ナビゲーション */}
      <div className='flex max-h-[calc(100vh-13rem)] grow flex-col gap-10 overflow-y-auto px-4 pb-4 lg:overflow-scroll'>
        <ChapterNavList workspaceId={workspaceId} chapters={curriculum.chapters ?? []} />
      </div>
    </div>
  )
}
