import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import type { TemplateItem } from '@/features/settings/components/coach/ChatMessageTemplateSettingList'
import { useEffect, useState } from 'react'
import { BiSmile } from 'react-icons/bi'

type EditChatMessageTemplateProps = {
  templateItem: TemplateItem | null
  onSave: (templateItem: TemplateItem) => void
  onBack: () => void
}

export default function EditChatMessageTemplate({
  templateItem,
  onSave,
  onBack,
}: EditChatMessageTemplateProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleCount, setTitleCount] = useState(0)

  const maxTitleCount = 20

  // 定型文新規作成テスト用ID
  const sampleCreateId = 999

  useEffect(() => {
    setTitle(templateItem?.title || '')
    setTitleCount(templateItem?.title.length || 0)
    setContent(templateItem?.content || '')
  }, [templateItem])

  return (
    <div className='flex h-full flex-col gap-5'>
      <h1 className='text-3xl'>{templateItem ? '定型文の編集' : '定型文の追加'}</h1>
      <div>
        <p className='mb-2.5 text-xl'>タイトル</p>
        <Input
          className='h-12 w-full'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setTitleCount(e.target.value.length)
          }}
        />
        <div className='flex justify-end text-xs text-text-secondary'>
          {titleCount}/{maxTitleCount}
        </div>
      </div>

      <div className='mb-8 h-full'>
        <p className='mb-2.5 text-xl'>定型文</p>
        <div className='flex h-full flex-col rounded border'>
          <Textarea
            className='h-full border-none'
            value={content || ''}
            placeholder='定型文を入力してください'
            onChange={(e) => setContent(e.target.value)}
          />
          <div className='flex size-12 p-4 text-xs text-text-secondary'>
            <BiSmile className='size-5' />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Button className='h-12 w-36' intent='secondary' onClick={onBack}>
          戻る
        </Button>
        <Button
          className='ml-5 h-12 w-36'
          onClick={() =>
            onSave({
              id: templateItem !== null ? templateItem.id : sampleCreateId,
              title,
              content,
            })
          }
        >
          {templateItem ? '定型文を更新' : '定型文を追加'}
        </Button>
      </div>
    </div>
  )
}
