'use client'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import cn from '@/hooks/cn'
import Link from 'next/link'

type QuizCardProps = {
  workspaceId: string
  curriculum: Curriculum
}

export default function QuizCard({ workspaceId, curriculum }: QuizCardProps) {
  return (
    <div className='h-full bg-white'>
      <h2 className='mb-5 text-xl font-bold'>{curriculum.title}</h2>
      {curriculum.chapters && curriculum.chapters.length > 0 && (
        <>
          {curriculum.chapters.map((chapter) => (
            <Link
              href={`/renewal/user/${workspaceId}/quiz/chapters/${chapter.id}`}
              key={chapter.id}
            >
              <div className='flex cursor-pointer items-center gap-2 border-b p-1 hover:bg-bg-hover-primary'>
                <div
                  className={cn(
                    'flex w-9 justify-center text-nowrap rounded-sm p-0.5',
                    chapter.isPassed ? 'bg-warn-red' : 'bg-main-color',
                  )}
                >
                  <p className='text-xs text-white'>{chapter.isPassed ? '合格' : '未合格'}</p>
                </div>
                <div className='text-sm font-normal text-main-color'>
                  <p>{chapter.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
