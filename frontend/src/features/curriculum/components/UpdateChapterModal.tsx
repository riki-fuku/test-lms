import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { ChapterAll } from '@/features/curriculum/types/ChapterAll'
import { useState } from 'react'

type UpdateChapterModalProps = {
  chapter: ChapterAll
  curriculumId: string
  visible: boolean
  onClose: () => void
  onSave: (
    chapterId: string,
    curriculumId: string,
    title: string,
    isPublic: boolean,
    order: number,
  ) => void
}

export default function UpdateChapterModal({
  chapter,
  curriculumId,
  visible,
  onClose,
  onSave,
}: UpdateChapterModalProps) {
  const [title, setTitle] = useState(chapter.title)
  const [isPublic, setIsPublic] = useState(chapter.isPublic)
  const [order, setOrder] = useState(chapter.order)

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(chapter.id, curriculumId, title, isPublic, order)
    onClose()
  }

  return (
    <>
      <Modal visible={visible}>
        <div className='mb-8 flex flex-col gap-8'>
          <h1 className='text-2xl font-bold'>チャプター更新</h1>
          <label htmlFor='title'>タイトル</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor='isPublic'>表示状態</label>
          <div className='flex items-center gap-4'>
            <select
              id='isPublic'
              value={isPublic ? 'true' : 'false'}
              onChange={(e) => setIsPublic(e.target.value === 'true')}
              className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
            >
              <option value='true'>公開中</option>
              <option value='false'>非公開</option>
            </select>
          </div>
          <label>表示順</label>
          <Input
            type='number'
            value={String(order)}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>
        <div className='mx-auto flex justify-center gap-5'>
          <Button onClick={handleCancelButton}>キャンセル</Button>
          <Button onClick={handleSaveButton}>保存</Button>
        </div>
      </Modal>
    </>
  )
}
