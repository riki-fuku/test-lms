import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { Segment } from '@/components/ui/SegmentedControl'
import SegmentedControl from '@/components/ui/SegmentedControl'
import Textarea from '@/components/ui/Textarea'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import fileUpload from '@/features/file/api/fileUpload'
import FileUploadModal from '@/features/file/components/FileUploadModal'
import { QUESTION_TEMPLATE } from '@/features/questions/constants/questionTemplate'
import { QUESTION_TEMPLATE_MAZIDESIGN } from '@/features/questions/constants/questionTemplateMazidesign'
import { useActorStore } from '@/store/actor-store'
import { useEffect, useState } from 'react'

type CreateMainProps = {
  workspaceId: string
  className?: string
  onChangeTitle: (title: string) => void
  onChange: (markdown: string) => void
  onSubmitQuestion?: () => void
  onBack?: () => void
}

type SegmentKey = 'markdown' | 'preview'

export default function CreateMain({
  workspaceId,
  className,
  onChangeTitle,
  onChange,
  onSubmitQuestion,
  onBack,
}: CreateMainProps) {
  const { actor } = useActorStore((state) => state)
  const [markdown, setMarkdown] = useState<string>('')
  const [segmentKey, setSegmentKey] = useState<SegmentKey>('markdown')
  const [isOpenFileUploadModal, setIsOpenFileUploadModal] = useState<boolean>(false)
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

  useEffect(() => {
    if (actor?.activeWorkspace.workspace?.name === MAZIDESIGN_WORKSPACE_NAME) {
      setMarkdown(QUESTION_TEMPLATE_MAZIDESIGN)
      onChange(QUESTION_TEMPLATE_MAZIDESIGN)
    } else {
      setMarkdown(QUESTION_TEMPLATE)
      onChange(QUESTION_TEMPLATE)
    }
  }, [])

  const changeSegmentKey = (segment: Segment<SegmentKey>) => {
    setSegmentKey(segment.key)
  }

  const handlePolicyModal = () => {
    onSubmitQuestion && onSubmitQuestion()
  }

  const handleChangeTextarea = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
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
            className='flex'
          />
        </div>

        <div className='flex flex-col gap-5 p-4'>
          <div className='flex items-center justify-between'>
            <p onClick={onBack} className='cursor-pointer text-sm text-text-secondary lg:hidden'>
              &lt; タグ・カテゴリー選択
            </p>
            <p
              onClick={handlePolicyModal}
              className='cursor-pointer text-right text-text-blue-primary lg:hidden'
            >
              公開
            </p>
          </div>
          <Input
            placeholder='質問のタイトルを追加'
            className='w-full border-none py-4 text-xl font-bold lg:mb-2 lg:border'
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          {segmentKey === 'markdown' ? (
            <>
              <Textarea
                className='h-dvh border-none drop-shadow-none lg:border'
                value={markdown}
                onChange={handleChangeTextarea}
              />
              <Button className='sticky bottom-4' onClick={() => setIsOpenFileUploadModal(true)}>
                画像アップロード
              </Button>
            </>
          ) : (
            <MarkDown2HTML>{markdown}</MarkDown2HTML>
          )}
        </div>

        <FileUploadModal
          isOpen={isOpenFileUploadModal}
          onClose={() => setIsOpenFileUploadModal(false)}
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
