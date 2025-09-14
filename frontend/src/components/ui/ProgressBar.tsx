import cn from '@/hooks/cn'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

type ProgressBar = VariantProps<typeof progressBar> & {
  progress: number
  showProgressNum?: boolean
  className?: string
}

const progressBar = cva(['w-full rounded border-0 border-solid bg-bg-primary'], {
  variants: {
    size: {
      sm: ['h-1'],
      md: ['h-2'],
      lg: ['h-3'],
      xl: ['h-5'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export default function ProgressBar(props: ProgressBar) {
  const className = progressBar({ size: props.size })

  function textSize() {
    switch (true) {
      case props.size === 'sm':
        return 'text-xs'
      case props.size === 'xl':
        return 'text-xl'
      default:
        return 'text-sm'
    }
  }

  return (
    <div className={cn('flex w-full items-center justify-between gap-3')}>
      <div className={cn(className, props.className)}>
        <div
          className='h-full rounded border-0 border-solid bg-gradient-to-r from-sub-color to-main-color'
          style={{ width: `${props.progress}%` }}
        ></div>
      </div>
      {props.showProgressNum && (
        <div className='flex items-end'>
          <span className={cn(textSize())}>{props.progress}%</span>
        </div>
      )}
    </div>
  )
}
