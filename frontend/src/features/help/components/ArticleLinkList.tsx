import ArticleLink from '@/features/help/components/ArticleLink'
import type { Article } from '@/features/help/types/Article'

type ArticleLinkListProps = {
  articles: Article[]
  workspaceId: string
  chapterId: string
  categoryId: string
}

export default function ArticleLinkList({
  articles,
  workspaceId,
  chapterId,
  categoryId,
}: ArticleLinkListProps) {
  return (
    <nav>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <ArticleLink
              article={article}
              workspaceId={workspaceId}
              chapterId={chapterId}
              categoryId={categoryId}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
