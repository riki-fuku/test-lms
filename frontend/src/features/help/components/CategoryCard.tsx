import type { Category } from '@/features/help/types/Category'

type CategoryCardProps = {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className='flex h-40 cursor-pointer items-center rounded border-2 border-border-primary p-2 lg:px-5'>
      <div className='grid grid-rows-2 gap-1'>
        <h3 className='text-md font-bold lg:text-base'>{category.title}</h3>
        <p className=' line-clamp-3 h-14 text-sm text-text-secondary lg:line-clamp-2 lg:h-8'>
          {category.description}
        </p>
      </div>
    </article>
  )
}
