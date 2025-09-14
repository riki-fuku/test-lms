import cn from '@/hooks/cn'
import { cva } from 'class-variance-authority'

type TooltipProps = {
  text: string
  className?: string
  size?: 'sm' | 'md'
}

const tooltip = cva(
  ['pointer-events-none whitespace-nowrap rounded bg-black text-white transition'],
  {
    variants: {
      size: {
        md: ['text-sm px-2 py-1'],
        sm: ['text-xs px-2.5 py-1'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export default function Tooltip(props: TooltipProps) {
  const className = cn(tooltip({ size: props.size }), props.className)
  return <span className={className}>{props.text}</span>
}
