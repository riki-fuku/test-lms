import ArticleLinkList from '@/features/help/components/ArticleLinkList'
import ChapterLink from '@/features/help/components/ChapterLink'
import type { Chapter } from '@/features/help/types/Chapter'
import { useState } from 'react'

type ChapterNavProps = {
  workspaceId: string
  chapter: Chapter
  categoryId: string
}

export default function ChapterNav({ workspaceId, chapter, categoryId }: ChapterNavProps) {
  const MAX_DISPLAY_COUNT = 5
  const articles = chapter.articles ?? []

  const [displayCount, setDisplayCount] = useState(MAX_DISPLAY_COUNT)
  const displayArticles = articles.slice(0, displayCount)
  const hiddenCount = articles.length - displayCount

  const handleShowMoreArticles = () => {
    setDisplayCount(articles.length)
  }

  return (
    <nav>
      <div className='mb-3 lg:mb-0'>
        <ChapterLink workspaceId={workspaceId} chapter={chapter} categoryId={categoryId} />
      </div>
      <ArticleLinkList
        articles={displayArticles}
        workspaceId={workspaceId}
        chapterId={chapter.id}
        categoryId={categoryId}
      />
      {hiddenCount > 0 && (
        <div
          className='mt-2 cursor-pointer text-text-blue-primary underline'
          onClick={handleShowMoreArticles}
        >
          あと{hiddenCount}件を表示する
        </div>
      )}
    </nav>
  )
}
