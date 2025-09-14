import cn from '@/hooks/cn'

export default function Tag({ title, author }: { title: string; author: 'coach' | 'admin' }) {
  return (
    <div
      className={cn(
        'flex h-6 items-center rounded px-2.5 py-1',
        author === 'coach' ? 'border bg-white text-text-secondary' : 'bg-bg-tertiary text-white',
      )}
    >
      {title}
    </div>
  )
}
