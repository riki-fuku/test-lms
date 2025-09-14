'use client'

import CategoryCard from '@/features/help/components/CategoryCard'
import useFetchHelpCategories from '@/features/help/hooks/useFetchHelpCategories'
import Link from 'next/link'

type CategoryListProps = {
  workspaceId: string
}

export default function CategoryList({ workspaceId }: CategoryListProps) {
  const { data, isLoading } = useFetchHelpCategories(workspaceId)

  const categories = data ?? []

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
      {categories.map((category, index) => (
        <Link key={category.id} href={`/renewal/${workspaceId}/help/categories/${category.id}`}>
          <CategoryCard key={index} category={category} />
        </Link>
      ))}
    </div>
  )
}
