import cn from '@/hooks/cn'
import type { Key } from 'react'
import { useState } from 'react'

export type Segment<T = Key> = {
  label: string
  key: T extends Key ? T : never
}

type SegmentedControlProps<T> = {
  segments: Segment<T>[]
  defaultTabKey: T
  onChange: (segment: Segment<T>) => void
  className?: string
}

export default function SegmentedControl<T>({
  segments,
  defaultTabKey,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const [activeKey, setActiveKey] = useState(defaultTabKey)

  const handleClickTab = (segment: Segment<T>) => {
    setActiveKey(segment.key)
    onChange(segment)
  }

  const isActive = (segment: Segment<T>) => {
    return activeKey === segment.key
  }

  return (
    <div className={cn('flex overflow-hidden rounded text-sm', className)}>
      {segments.map((segment) => (
        <div
          key={segment.key as Key}
          className={cn(
            'segment-item min-w-16 cursor-pointer bg-bg-primary px-4 py-1 text-center',
            isActive(segment) && 'bg-gradient-to-r from-sub-color to-main-color text-white',
          )}
          onClick={() => handleClickTab(segment)}
        >
          {segment.label}
        </div>
      ))}
    </div>
  )
}
