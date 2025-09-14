import cn from '@/hooks/cn'

type SortTabProps = {
  tab: string
  selected: boolean
}

export default function SortTab({ tab, selected }: SortTabProps) {
  return (
    <div className='[&_div]:hover:bg-bg-tertiary [&_p]:hover:text-text-primary'>
      <p
        className={cn(
          'cursor-pointer truncate p-2 text-sm text-text-secondary lg:text-md',
          selected && 'font-bold text-text-secondary',
        )}
      >
        {tab}
      </p>
      <div
        className={cn(
          'h-0.5 bg-bg-primary',
          selected && 'bg-gradient-to-r from-sub-color to-main-color',
        )}
      ></div>
    </div>
  )
}
