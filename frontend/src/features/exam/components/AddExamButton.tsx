'use client'

import Button from '@/components/elements/Button'
import createExam from '@/features/exam/api/createExam'
import CreateExamModal from '@/features/exam/components/CreateExamModal'
import type { ExamType } from '@/features/examType/types/ExamType'
import useDisclosure from '@/hooks/useDisclosure'
import { useRouter } from 'next/navigation'

type AddExamButtonProps = {
  workspaceId: string
  examTypes: ExamType[]
}

export default function AddExamButton({ workspaceId, examTypes }: AddExamButtonProps) {
  const createModal = useDisclosure()
  const router = useRouter()

  const handleAddClick = () => {
    createModal.open()
  }

  const handleSaveExam = async (examTypeId: string, name: string) => {
    await createExam(workspaceId, {
      examTypeId,
      name,
    })
    router.refresh()
  }

  return (
    <>
      <Button intent='secondary' className='w-fit' onClick={handleAddClick}>
        + テスト追加
      </Button>

      <CreateExamModal
        examTypes={examTypes}
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSave={handleSaveExam}
      />
    </>
  )
}
