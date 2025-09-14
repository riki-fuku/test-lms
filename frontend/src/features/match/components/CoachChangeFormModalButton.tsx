'use client'

import { Button } from '@/components/kit'
import { CoachChangeFormModal } from '@/features/match/components'
import { useDisclosure } from '@heroui/react'

type CoachChangeFormModalButtonProps = {
  userName?: string
  currentEmployee?: string
  workspaceId: string
  userId: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function CoachChangeFormModalButton({
  userName,
  currentEmployee,
  workspaceId,
  userId,
  onSuccess,
  onError,
}: CoachChangeFormModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button color='primary' onPress={onOpen}>
        コーチ変更
      </Button>
      <CoachChangeFormModal
        isOpen={isOpen}
        onClose={onClose}
        userName={userName}
        currentEmployee={currentEmployee}
        workspaceId={workspaceId}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  )
}
