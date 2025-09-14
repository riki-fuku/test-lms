'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import Modal from '@/components/elements/Modal'
import updateExamType from '@/features/exam-types/api/updateExamType'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type UpdateExamTypeModalProps = {
  workspaceId: string
  isOpen: boolean
  onClose: () => void
  initialName: string
  examTypeId: string
}

export default function UpdateExamTypeModal({
  workspaceId,
  isOpen,
  onClose,
  initialName,
  examTypeId,
}: UpdateExamTypeModalProps) {
  const router = useRouter()
  const [name, setName] = useState(initialName)

  useEffect(() => {
    if (isOpen) {
      setName(initialName)
    }
  }, [isOpen, initialName])

  const { showSnackbar } = useSnackbar()
  const handleSaveButton = async () => {
    if (!name.trim()) {
      showSnackbar('テスト種別を入力してください', 'warning')
      return
    }
    await updateExamType(workspaceId, examTypeId, { name })
    onClose()
    router.refresh()
  }

  return (
    <Modal visible={isOpen}>
      <div className='mb-8 flex flex-col gap-8'>
        <h1 className='text-2xl font-bold'>テスト種別編集</h1>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='mx-auto flex justify-center gap-5'>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSaveButton}>更新</Button>
      </div>
    </Modal>
  )
}
