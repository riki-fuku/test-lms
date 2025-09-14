'use client'

import { Button } from '@/components/kit'
import { SuspendApplicationStatusChangeFormModal } from '@/features/suspendApplication/components'
import type { SuspendApplication } from '@/features/suspendApplication/types/SuspendApplication'
import { useDisclosure } from '@heroui/react'

type Props = {
  workspaceId: string
  suspendApplication: Pick<
    SuspendApplication,
    | 'id'
    | 'startDate'
    | 'endDate'
    | 'status'
    | 'resultStatus'
    | 'user'
    | 'latestApplicationStatusLog'
  >
}

export function SuspendApplicationStatusChangeFormModalButton({
  workspaceId,
  suspendApplication,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className='bg-blue-600 text-white'>
        申請状況を変更
      </Button>
      <SuspendApplicationStatusChangeFormModal
        workspaceId={workspaceId}
        suspendApplication={suspendApplication}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
