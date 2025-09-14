'use client'

import cn from '@/hooks/cn'
import { useAsyncSafeAction } from '@/hooks/useAsyncSafeAction'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { useState } from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    children: Readonly<React.ReactNode>
  }

export const button = cva(['cursor-pointer rounded px-5 line-clamp-1'], {
  variants: {
    intent: {
      primary: ['bg-gradient-to-r from-sub-color to-main-color text-white'],
      secondary: [
        'border border-border-secondary bg-white text-text-secondary hover:bg-bg-tertiary hover:text-white hover:drop-shadow',
      ],
    },
    size: {
      md: ['text-md min-w-44 leading-10'],
      sm: ['text-sm min-w-28 leading-7'],
      xs: ['text-xs min-w-16 leading-4'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

export default function Button({
  onClick,
  intent,
  size,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const [action, isLoading] = useAsyncSafeAction(onClick ?? (() => {}))
  const [isMouseDown, setIsMouseDown] = useState(false)

  const className = cn(
    button({ intent, size }),
    [isMouseDown && 'brightness-75'],
    [disabled && 'opacity-20'],
    props.className,
  )

  return (
    <>
      <button
        {...props}
        className={className}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
        onClick={action}
        disabled={disabled || isLoading}
      >
        {children}
      </button>
    </>
  )
}
