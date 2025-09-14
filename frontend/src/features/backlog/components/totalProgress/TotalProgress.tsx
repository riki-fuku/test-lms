import ProgressBar from '@/components/ui/ProgressBar'
import Average from '@/features/backlog/components/totalProgress/Average'
import Bug from '@/features/backlog/components/totalProgress/Bug'
import Progress from '@/features/backlog/components/totalProgress/Progress'
import Trashed from '@/features/backlog/components/totalProgress/Trashed'
import type { UserTask } from '@/features/backlog/types/UserTask'

type TotalProgressProps = {
  totalSP: number
  completedSP: number
  AverageSP: number
  bugCount: number
  trashedTasks?: UserTask[]
  openTrash: () => void
}

export default function TotalProgress({
  totalSP,
  completedSP,
  AverageSP,
  bugCount,
  trashedTasks,
  openTrash,
}: TotalProgressProps) {
  const getProgress = () => {
    const progress = Math.round((completedSP / totalSP) * 100)
    return Number.isNaN(progress) ? 0 : progress
  }

  return (
    <div className='flex items-center justify-between gap-5'>
      <div className='flex flex-1 !text-xl'>
        <ProgressBar size='xl' className='mr-2.5' progress={getProgress()} showProgressNum />
      </div>
      <div className='5 flex w-1/2 items-center gap-2'>
        <Progress completedSP={completedSP} totalSP={totalSP} />
        <Average averageSP={AverageSP} />
        <Bug bugCount={bugCount} />
        {trashedTasks && <Trashed trashedCount={trashedTasks.length} openTrash={openTrash} />}
      </div>
    </div>
  )
}
