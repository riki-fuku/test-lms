import BreadCrumb from '@/components/ui/BreadCrumb'
import type { Article } from '@/features/help/types/Article'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type ArticleSearchResultItemProps = {
  article: Article
}

export default function ArticleSearchResultItem({ article }: ArticleSearchResultItemProps) {
  const chapter = article.chapter
  const category = article.chapter?.category
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const getBredCrumbLinksByArticle = () => {
    return [
      { href: `/renewal/${workspaceId}/help`, title: 'ヘルプセンター' },
      {
        href: `/renewal/${workspaceId}/help/categories/${category?.id}`,
        title: category?.title || '',
      },
      {
        href: `/renewal/${workspaceId}/help/categories/${category?.id}/chapters/${chapter?.id}`,
        title: chapter?.title || '',
      },
    ]
  }

  return (
    <Link
      href={`/renewal/${workspaceId}/help/categories/${category?.id}/chapters/${chapter?.id}/articles/${article.id}/`}
    >
      <div className='flex cursor-pointer flex-col gap-2 p-5 hover:bg-bg-hover-primary'>
        <h2 className='text-blue-500'>{article.title}</h2>
        <BreadCrumb links={getBredCrumbLinksByArticle()} />
        <p className='line-clamp-3'>
          {article.content
            .replace(/<br>/g, '')
            .replace(/<span.+\/span>/g, '')
            .replace(/[*#]/g, '')
            .replace(/!\[.+\)/g, '')}
        </p>
      </div>
    </Link>
  )
}

//.replace(/!\[アカウント設定画面.png\]/g,'')
