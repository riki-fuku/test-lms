import ArticleSearchResultItem from '@/features/help/components/ArticleSearchResultItem'
import type { Article } from '@/features/help/types/Article'

type ArticleSearchResultItemListProps = {
  articles: Article[]
}

export default function ArticleSearchResultItemList({
  articles,
}: ArticleSearchResultItemListProps) {
  return (
    <div>
      {articles.map((article, index) => (
        <ArticleSearchResultItem key={index} article={article} />
      ))}
    </div>
  )
}
