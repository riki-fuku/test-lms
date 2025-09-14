'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import Modal from '@/components/elements/Modal'
import createExamType from '@/features/exam-types/api/createExamType'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type CreateExamTypeModalProps = {
  workspaceId: string
  isOpen: boolean
  onClose: () => void
}

export default function CreateExamTypeModal({
  workspaceId,
  isOpen,
  onClose,
}: CreateExamTypeModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (isOpen) {
      setName('')
    }
  }, [isOpen])

  const handleSaveButton = async () => {
    if (!name.trim()) {
      showSnackbar('テスト種別を入力してください', 'warning')
      return
    }

    await createExamType(workspaceId, { name })
    onClose()
    router.refresh()
  }

  return (
    <Modal visible={isOpen}>
      <div className='mb-8 flex flex-col gap-8 text-center'>
        <h1 className='text-2xl font-bold'>テスト種別作成</h1>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='mx-auto flex justify-center gap-5'>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSaveButton}>保存</Button>
      </div>
    </Modal>
  )
}
