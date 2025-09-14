'use client'

import { Button } from '@/components/kit'
import { CoachChangeApplicationStatusChangeFormModal } from '@/features/coachChangeApplication/components'
import type { CoachChangeApplication } from '@/features/coachChangeApplication/types'
import { useDisclosure } from '@heroui/react'

type Props = {
  workspaceId: string
  coachChangeApplication: Pick<
    CoachChangeApplication,
    'id' | 'status' | 'resultStatus' | 'user' | 'latestApplicationStatusLog'
  >
}

export function CoachChangeApplicationStatusChangeFormModalButton({
  workspaceId,
  coachChangeApplication,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className='bg-blue-600 text-white'>
        申請状況を変更
      </Button>
      <CoachChangeApplicationStatusChangeFormModal
        workspaceId={workspaceId}
        coachChangeApplication={coachChangeApplication}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
