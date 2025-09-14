'use client'

import updateExam from '@/features/exam/api/updateExam'
import UpdateExamModal from '@/features/exam/components/UpdateExamModal'
import type { Exam } from '@/features/exam/types/Exam'
import type { ExamType } from '@/features/examType/types/ExamType'
import useDisclosure from '@/hooks/useDisclosure'
import { Link } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiPencil } from 'react-icons/hi'

type EditExamLinkProps = {
  workspaceId: string
  exam: Exam
  examTypes: ExamType[]
}

export default function EditExamButton({ workspaceId, exam, examTypes }: EditExamLinkProps) {
  const updateModal = useDisclosure()
  const [selectedExam, setSelectedExam] = useState<Exam>(exam)
  const router = useRouter()

  const handleEditClick = (exam: Exam) => {
    setSelectedExam(exam)
    updateModal.open()
  }

  const handleUpdateExam = async (examId: string, examTypeId: string, name: string) => {
    await updateExam(workspaceId, examId, {
      examTypeId,
      name,
    })
    router.refresh()
  }

  return (
    <>
      <Link
        className='flex cursor-pointer items-center justify-center'
        onClick={() => handleEditClick(exam)}
      >
        <HiPencil className='text-2xl' />
      </Link>

      <UpdateExamModal
        exam={selectedExam}
        examTypes={examTypes}
        isOpen={updateModal.isOpen}
        onClose={updateModal.close}
        onSave={handleUpdateExam}
      />
    </>
  )
}
