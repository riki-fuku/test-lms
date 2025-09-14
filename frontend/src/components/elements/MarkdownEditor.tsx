'use client'

import FileUploadButton from '@/components/elements/FileUploadButton'
import MarkDown2HTML from '@/components/elements/MarkDown2HTML'
import type { Segment } from '@/components/elements/SegmentedControl'
import SegmentedControl from '@/components/elements/SegmentedControl'
import Textarea from '@/components/elements/Textarea'
import { useState } from 'react'

type SegmentKey = 'markdown' | 'preview'

interface MarkdownEditorProps {
  workspaceId: string
  title: string
  content: string
  onChangeTitle?: (title: string) => void
  onChangeContent: (content: string) => void
}

export default function MarkdownEditor({
  workspaceId,
  title,
  content,
  onChangeTitle,
  onChangeContent,
}: MarkdownEditorProps) {
  const [segmentKey, setSegmentKey] = useState<SegmentKey>('markdown')
  const segments: Segment<SegmentKey>[] = [
    {
      key: 'markdown',
      label: 'マークダウン',
    },
    {
      key: 'preview',
      label: 'プレビュー',
    },
  ]

  const changeSegmentKey = (segment: Segment<SegmentKey>) => {
    setSegmentKey(segment.key)
  }

  return (
    <>
      <div className='h-hull flex flex-col gap-2 rounded-sm bg-white py-5 lg:py-0'>
        <div className='top-0 z-10 hidden lg:sticky lg:flex lg:flex-row-reverse'>
          <SegmentedControl
            segments={segments}
            defaultTabKey='markdown'
            onChange={changeSegmentKey}
          />
        </div>

        <div className='flex flex-col gap-5 p-4'>
          {segmentKey === 'markdown' ? (
            <>
              {onChangeTitle && (
                <p className='text-2xl font-bold'>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => {
                      onChangeTitle(e.target.value)
                    }}
                  />
                </p>
              )}
              {!onChangeTitle && <p className='text-2xl font-bold'>{title}</p>}
              <Textarea
                className='h-dvh border-none drop-shadow-none'
                value={content}
                onChange={(e) => {
                  onChangeContent(e.target.value)
                }}
              />
              <FileUploadButton workspaceId={workspaceId} className='sticky bottom-4' />
            </>
          ) : (
            <>
              <p className='text-2xl font-bold'>{title}</p>
              <MarkDown2HTML>{content}</MarkDown2HTML>
            </>
          )}
        </div>
      </div>

      <div className='sticky bottom-0 z-10 lg:hidden'>
        <SegmentedControl
          segments={segments}
          defaultTabKey='markdown'
          onChange={changeSegmentKey}
          className='flex [&>.segment-item]:w-full [&>.segment-item]:leading-[3rem]'
        />
      </div>
    </>
  )
}
