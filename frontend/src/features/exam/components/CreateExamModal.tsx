import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import Modal from '@/components/elements/Modal'
import type { ExamType } from '@/features/examType/types/ExamType'
import { useState } from 'react'

type CreateExamModalProps = {
  examTypes: ExamType[]
  isOpen: boolean
  onClose: () => void
  onSave: (examTypeId: string, name: string) => void
}

export default function CreateExamModal({
  examTypes,
  isOpen,
  onClose,
  onSave,
}: CreateExamModalProps) {
  const [examTypeId, setExamTypeId] = useState('')
  const [name, setName] = useState('')

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(examTypeId, name)

    setExamTypeId('')
    setName('')
    onClose()
  }

  return (
    <Modal visible={isOpen}>
      <div className='mb-8 flex flex-col gap-8'>
        <h1 className='text-2xl font-bold'>テスト作成</h1>
        <label htmlFor='examTypeId'>テスト種別名</label>
        <div className='flex items-center gap-4'>
          <select
            id='examTypeId'
            value={examTypeId}
            onChange={(e) => setExamTypeId(e.target.value)}
            className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
          >
            <option value='' disabled>
              選択してください
            </option>
            {examTypes.map((examType) => (
              <option key={examType.id} value={examType.id}>
                {examType.name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor='name'>テスト名</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='mx-auto flex justify-center gap-5'>
        <Button onClick={handleCancelButton}>キャンセル</Button>
        <Button onClick={handleSaveButton}>保存</Button>
      </div>
    </Modal>
  )
}
