'use client'

import UpdateExamTypeModal from '@/features/exam-types/components/UpdateExamTypeModal'
import type { ExamType } from '@/features/exam-types/types/ExamType'
import useDisclosure from '@/hooks/useDisclosure'
import { Link } from '@mui/material'
import { HiPencil } from 'react-icons/hi'

type EditExamTypeProps = {
  examType: ExamType
  workspaceId: string
}

export default function EditExamTypeLink({ examType, workspaceId }: EditExamTypeProps) {
  const updateModal = useDisclosure()

  return (
    <>
      <Link className='flex cursor-pointer items-center justify-center' onClick={updateModal.open}>
        <HiPencil className='text-2xl' />
      </Link>
      <UpdateExamTypeModal
        workspaceId={workspaceId}
        isOpen={updateModal.isOpen}
        onClose={updateModal.close}
        initialName={examType.name}
        examTypeId={examType.id}
      />
    </>
  )
}
