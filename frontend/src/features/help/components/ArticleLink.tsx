import type { Article } from '@/features/help/types/Article'
import Link from 'next/link'

type ArticleLinkProps = {
  article: Article
  workspaceId: string
  chapterId: string
  categoryId: string
}

export default function ArticleLink({
  article,
  workspaceId,
  chapterId,
  categoryId,
}: ArticleLinkProps) {
  const href = `/renewal/${workspaceId}/help/categories/${categoryId}/chapters/${chapterId}/articles/${article.id}`
  return (
    <Link href={href}>
      <p className='border-b-2 border-border-primary py-2 hover:underline'>{article.title}</p>
    </Link>
  )
}
