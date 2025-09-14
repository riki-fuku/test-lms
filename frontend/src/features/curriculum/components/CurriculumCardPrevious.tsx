import Image from '@/components/ui/Image'
import ProgressBar from '@/components/ui/ProgressBar'
import type { LocalStoragePrevCurriculum } from '@/features/curriculum/types/LocalStoragePrevCurriculum'

type CurriculumCardPreviousProps = {
  curriculum: LocalStoragePrevCurriculum
}

export default function CurriculumCardPrevious({ curriculum }: CurriculumCardPreviousProps) {
  return (
    <div className='grid cursor-pointer items-center gap-5 rounded border border-solid px-2 py-5 lg:grid-cols-3 lg:grid-rows-1 lg:p-5'>
      <h1 className='text-xl font-bold lg:col-start-1 lg:col-end-3 lg:row-start-1'>前回の続き</h1>
      <div className='relative m-auto aspect-[2/1] w-full max-w-xs lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3'>
        <Image alt='curriculum_image' src={curriculum.eyeCatchUrl} className='object-fill' fill />
      </div>
      <div className='lg:col-start-1 lg:col-end-3'>
        <p className='text-base lg:text-xl'>{curriculum.title}</p>
        <p className='mt-2 text-xs text-text-secondary lg:text-base'>{curriculum.description}</p>
        <div className='mt-5'>
          <ProgressBar progress={curriculum.progress || 0} showProgressNum />
        </div>
      </div>
    </div>
  )
}
