import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import Modal from '@/components/elements/Modal'
import type { Exam } from '@/features/exam/types/Exam'
import type { ExamType } from '@/features/examType/types/ExamType'
import { useState } from 'react'

type UpdateExamModalProps = {
  exam: Exam
  examTypes: ExamType[]
  isOpen: boolean
  onClose: () => void
  onSave: (examId: string, examTypeId: string, name: string) => void
}

export default function UpdateExamModal({
  exam,
  examTypes,
  isOpen,
  onClose,
  onSave,
}: UpdateExamModalProps) {
  const [examTypeId, setExamTypeId] = useState(exam.examType.id)
  const [name, setName] = useState(exam.name)

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(exam.id, examTypeId, name)
    onClose()
  }

  return (
    <Modal visible={isOpen}>
      <div className='mb-8 flex flex-col gap-8 text-left'>
        <h1 className='text-2xl font-bold'>テスト編集</h1>
        <label htmlFor='examTypeId'>テスト種別名</label>
        <div className='flex items-center gap-4'>
          <select
            id='examTypeId'
            value={examTypeId}
            onChange={(e) => setExamTypeId(e.target.value)}
            className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
          >
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
