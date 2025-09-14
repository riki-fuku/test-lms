import ChapterNav from '@/features/help/components/ChapterNav'
import type { Chapter } from '@/features/help/types/Chapter'

type ChapterNavListProps = {
  chapters: Chapter[]
  workspaceId: string
  categoryId: string
}

export default function ChapterNavList({ chapters, workspaceId, categoryId }: ChapterNavListProps) {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-5'>
      {chapters.map((chapter, index) => (
        <ChapterNav
          key={index}
          workspaceId={workspaceId}
          chapter={chapter}
          categoryId={categoryId}
        />
      ))}
    </div>
  )
}
