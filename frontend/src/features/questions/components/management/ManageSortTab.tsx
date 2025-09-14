import cn from '@/hooks/cn'

type SortTabProps = {
  tab: string
  count?: number
  selected: boolean
}

export default function ManageSortTab(props: SortTabProps) {
  return (
    <div className='[&_div]:hover:bg-bg-tertiary [&_p]:hover:text-text-primary'>
      <p
        className={cn(
          'cursor-pointer truncate p-2 text-sm text-text-secondary lg:text-md',
          props.selected && 'bg-bg-primary font-bold',
        )}
      >
        {props.tab}
        {props.count !== undefined && <span> ({props.count})</span>}
      </p>
      <div
        className={cn(
          'h-0.5 bg-bg-primary',
          props.selected && 'bg-gradient-to-r from-sub-color to-main-color',
        )}
      ></div>
    </div>
  )
}
