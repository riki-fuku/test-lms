import cn from '@/hooks/cn'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

type AvatarProps = VariantProps<typeof avatar> & {
  onClick?: () => void
  children?: Readonly<React.ReactNode>
  className?: string
}

const avatar = cva([], {
  variants: {
    size: {
      xs: ['w-5 h-5'],
      sm: ['w-8 h-8'],
      md: ['w-12 h-12'],
      lg: ['w-16 h-16'],
      xl: ['w-20 h-20'],
      xxl: ['w-24 h-24'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export default function Avatar(props: AvatarProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  const className = cn(
    avatar({ size: props.size }),
    'relative flex cursor-pointer items-center justify-center rounded-full shrink-0 bg-form-gray overflow-hidden',
    props.className,
  )

  return (
    <>
      <div className={className} onClick={handleClick}>
        {props.children}
      </div>
    </>
  )
}
