'use client'
import SectionNavList from '@/features/curriculum/components/SectionNavList'
import type { Chapter } from '@/features/curriculum/types/Chapter'

type ChapterNavListProps = {
  workspaceId: string
  chapters: Chapter[]
}

export default function ChapterNavList({ workspaceId, chapters }: ChapterNavListProps) {
  return (
    <>
      <ul className='flex flex-col gap-10'>
        {chapters.map((chapter, index) => {
          return (
            <li key={index}>
              <div className='font-bold'>
                <h3 className='flex items-start'>
                  <p className='shrink-0'>{index + 1}章：</p>
                  <span className='ml-2'>{chapter.title}</span>
                </h3>
              </div>
              <div className='mt-5'>
                <SectionNavList
                  key={index}
                  workspaceId={workspaceId}
                  chapterNumber={index + 1}
                  sections={chapter.sections ?? []}
                  chapterId={chapter.id}
                  curriculumId={chapter.curriculumId}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
