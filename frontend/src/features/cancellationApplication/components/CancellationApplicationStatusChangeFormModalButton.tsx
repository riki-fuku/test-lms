'use client'

import { Button } from '@/components/kit'
import { CancellationApplicationStatusChangeFormModal } from '@/features/cancellationApplication/components'
import type { CancellationApplication } from '@/features/cancellationApplication/types'
import { useDisclosure } from '@heroui/react'

type Props = {
  workspaceId: string
  cancellationApplication: Pick<
    CancellationApplication,
    'id' | 'cancellationDate' | 'status' | 'resultStatus' | 'user' | 'latestApplicationStatusLog'
  >
}

export function CancellationApplicationStatusChangeFormModalButton({
  workspaceId,
  cancellationApplication,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className='bg-blue-600 text-white'>
        申請状況を変更
      </Button>
      <CancellationApplicationStatusChangeFormModal
        workspaceId={workspaceId}
        cancellationApplication={cancellationApplication}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
