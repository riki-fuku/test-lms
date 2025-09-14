import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { Segment } from '@/components/ui/SegmentedControl'
import SegmentedControl from '@/components/ui/SegmentedControl'
import Textarea from '@/components/ui/Textarea'
import type { Section } from '@/features/curriculum/types/Section'
import fileUpload from '@/features/file/api/fileUpload'
import FileUploadModal from '@/features/file/components/FileUploadModal'
import useDisclosure from '@/hooks/useDisclosure'
import { useState } from 'react'

type UpdateSectionMainProps = {
  workspaceId: string
  section: Section
  className?: string
  onChangeTitle: (title: string) => void
  onChangeText: (text: string) => void
}

type SegmentKey = 'markdown' | 'preview'

export default function UpdateSectionMain({
  workspaceId,
  section,
  className,
  onChangeTitle,
  onChangeText,
}: UpdateSectionMainProps) {
  const [markdown, setMarkdown] = useState<string>(section.text ?? '')
  const [segmentKey, setSegmentKey] = useState<SegmentKey>('markdown')
  const fileUploadModal = useDisclosure()
  const [uploadedFilesUrl, setUploadedFilesUrl] = useState<string[]>([])
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

  const handleChangeTextarea = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(e.target.value)
    setMarkdown(e.target.value)
  }

  const handleSendFile = async (files: File[]) => {
    const data = new FormData()
    files.forEach((file) => {
      data.append('files[]', file)
      data.append('key', 'question')
    })

    const imageUrls = await fileUpload(workspaceId, data)
    setUploadedFilesUrl(imageUrls)
  }

  return (
    <>
      <div className={`h-hull flex flex-col gap-2 rounded-sm bg-white py-5 lg:py-0 ${className}`}>
        <div className='top-0 z-10 hidden lg:sticky lg:flex lg:flex-row-reverse'>
          <SegmentedControl
            segments={segments}
            defaultTabKey='markdown'
            onChange={changeSegmentKey}
          />
        </div>

        <div className='flex flex-col gap-5 border p-4'>
          <Input
            placeholder='セクションのタイトル'
            className='w-full border-none py-4 text-xl font-bold lg:mb-2'
            onChange={(e) => onChangeTitle(e.target.value)}
            value={section.title}
          />
          {segmentKey === 'markdown' ? (
            <>
              <Textarea
                className='h-dvh border-none drop-shadow-none'
                value={markdown}
                onChange={handleChangeTextarea}
              />
              <Button className='sticky bottom-4' onClick={fileUploadModal.open}>
                画像アップロード
              </Button>
            </>
          ) : (
            <MarkDown2HTML>{markdown}</MarkDown2HTML>
          )}
        </div>

        <FileUploadModal
          isOpen={fileUploadModal.isOpen}
          onClose={fileUploadModal.close}
          onSend={handleSendFile}
          fileUrls={uploadedFilesUrl}
        />

        <div className='sticky bottom-0 z-10 lg:hidden'>
          <SegmentedControl
            segments={segments}
            defaultTabKey='markdown'
            onChange={changeSegmentKey}
            className='flex [&>.segment-item]:w-full [&>.segment-item]:leading-[3rem]'
          />
        </div>
      </div>
    </>
  )
}
