'use client'

import Button from '@/components/elements/Button'
import CreateExamTypeModal from '@/features/exam-types/components/CreateExamTypeModal'
import useDisclosure from '@/hooks/useDisclosure'

type CreateExamTypeButtonProps = {
  workspaceId: string
}

export default function CreateExamTypeButton({ workspaceId }: CreateExamTypeButtonProps) {
  const createModal = useDisclosure()

  return (
    <>
      <Button intent='secondary' className='w-fit' onClick={createModal.open}>
        + テスト種別追加
      </Button>
      <CreateExamTypeModal
        workspaceId={workspaceId}
        isOpen={createModal.isOpen}
        onClose={createModal.close}
      />
    </>
  )
}
