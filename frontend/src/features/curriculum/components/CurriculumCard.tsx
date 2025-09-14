'use client'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import Image from 'next/image'

type CurriculumCardProps = {
  curriculum: Curriculum
}

export default function CurriculumCard({ curriculum }: CurriculumCardProps) {
  const handleClick = () => {}

  return (
    <div
      onClick={handleClick}
      className='h-full overflow-hidden rounded-md border border-bg-primary bg-white shadow'
    >
      <div className='relative aspect-[2/1] w-full'>
        <Image alt='curriculum_image' src={curriculum.eyeCatchUrl} className='object-fill' fill />
      </div>
      <div className='flex h-1/2 flex-col gap-2 px-2 py-5'>
        <h2 className='text-base font-bold text-text-primary'>{curriculum.title}</h2>
        {/* <ProgressBar progress={curriculum.progress ?? 0} size='sm' showProgressNum /> */}
        <div className='text-sm font-normal text-text-primary'>
          <p>{curriculum.description}</p>
        </div>
      </div>
    </div>
  )
}
