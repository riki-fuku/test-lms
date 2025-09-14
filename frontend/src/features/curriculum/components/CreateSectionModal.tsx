import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState } from 'react'

type CreateSectionModalProps = {
  chapterId: string
  visible: boolean
  onClose: () => void
  onSave: (chapterId: string, title: string, text: string, isPublic: boolean, order: number) => void
}

export default function CreateSectionModal({
  chapterId,
  visible,
  onClose,
  onSave,
}: CreateSectionModalProps) {
  const [title, setTitle] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [order, setOrder] = useState(0)

  // テキストはモーダルでは入力させないため仮の文章を登録
  const defaultText = '# テキストを入力してください'

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(chapterId, title, defaultText, isPublic, order)
    onClose()
  }

  return (
    <>
      <Modal visible={visible}>
        <div className='mb-8 flex flex-col gap-8'>
          <h1 className='text-2xl font-bold'>セクション作成</h1>
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
