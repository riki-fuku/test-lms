import type { Chapter } from '@/features/help/types/Chapter'
import Link from 'next/link'

type ChapterLinkProps = {
  workspaceId: string
  chapter: Chapter
  categoryId: string
}

export default function ChapterLink({ workspaceId, chapter, categoryId }: ChapterLinkProps) {
  return (
    <article>
      <Link href={`/renewal/${workspaceId}/help/categories/${categoryId}/chapters/${chapter.id}`}>
        <h3 className='text-lg font-bold hover:underline'>{chapter.title}</h3>
      </Link>
    </article>
  )
}
