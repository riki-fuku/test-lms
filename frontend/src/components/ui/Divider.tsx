'use client'

import cn from '@/hooks/cn'

type DividerProps = {
  className?: string
}

export default function Divider(props: DividerProps) {
  return <div className={cn(`my-4 h-px w-full bg-bg-secondary`, props.className)} />
}
