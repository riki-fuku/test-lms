import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import useFetchCurriculums from '@/features/curriculum/hooks/useFetchCurriculums'
import { useUserStore } from '@/store/user-store'
import Image from 'next/image'
import Link from 'next/link'

type ContinueCurriculumProps = {
  workspaceId: string
}

export default function ContinueCurriculum({ workspaceId }: ContinueCurriculumProps) {
  return (
    <div className='flex flex-col gap-5'>
      <PrevCurriculum />

      <div className='flex gap-2.5'>
        <Link href={`/renewal/${workspaceId}/curriculums`} className='w-1/2'>
          <Button className='h-12 cursor-pointer' intent='secondary'>
            教材一覧へ
          </Button>
        </Link>

        <PrevCurriculumLink />
      </div>
    </div>
  )
}

const PrevCurriculum: React.FC = () => {
  const previousStudyLogs = localStorage.getItem('prev_study_curriculum')
  const prevCurriculum = previousStudyLogs ? JSON.parse(previousStudyLogs) : null

  if (!prevCurriculum)
    return (
      <>
        <div className='border-b pb-2.5'>
          <p>教材を確認して学習開始しましょう。</p>
        </div>
        <p className='text-md'>
          いよいよ受講スタートです。教材でわからないことがあれば質問ページを確認してみてください。
        </p>
      </>
    )

  return (
    <>
      <div className='flex justify-between gap-2.5'>
        <div className='flex flex-col gap-2.5'>
          <p>{prevCurriculum?.title}</p>
          <p className='text-sm text-text-secondary'>{prevCurriculum?.description}</p>
        </div>
        <div className='relative h-14 w-24'>
          <Image src={`${prevCurriculum?.eyeCatchUrl}`} alt='thumbnail' fill />
        </div>
      </div>
      <ProgressBar progress={prevCurriculum?.progress || 0} size='sm' showProgressNum />
    </>
  )
}

const PrevCurriculumLink: React.FC = () => {
  const previousStudyLogs = localStorage.getItem('prev_study_curriculum')
  const prevCurriculum = previousStudyLogs ? JSON.parse(previousStudyLogs) : null

  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const { data: curriculums } = useFetchCurriculums(workspaceId)

  if (!prevCurriculum || prevCurriculum.workspaceId !== workspaceId) {
    if (!curriculums) return '教材がありません'
    if (curriculums.length === 0) return '教材がありません'

    return (
      <Link href={`/renewal/${workspaceId}/curriculums`} className='w-1/2'>
        <Button className='h-12 w-full cursor-pointer'>学習を開始</Button>
      </Link>
    )
  }

  return (
    <Link
      href={`/renewal/${workspaceId}/curriculums/${prevCurriculum.curriculumId}/chapters/${prevCurriculum.chapterId}/sections/${prevCurriculum.sectionId}`}
      className='w-1/2'
    >
      <Button className='h-12 w-full cursor-pointer'>続きからはじめる</Button>
    </Link>
  )
}
