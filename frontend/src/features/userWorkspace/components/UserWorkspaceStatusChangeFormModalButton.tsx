'use client'

import { Button } from '@/components/kit'
import { UserWorkspaceStatusChangeFormModal } from '@/features/userWorkspace/components'
import { useDisclosure } from '@heroui/react'

type UserWorkspaceStatusChangeModalButtonProps = {
  userName?: string
  currentStatusLabel?: string
  workspaceId: string
  userId: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function UserWorkspaceStatusChangeModalButton({
  userName,
  currentStatusLabel,
  workspaceId,
  userId,
  onSuccess,
  onError,
}: UserWorkspaceStatusChangeModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button color='primary' onPress={onOpen}>
        受講状態変更
      </Button>
      <UserWorkspaceStatusChangeFormModal
        isOpen={isOpen}
        onClose={onClose}
        userName={userName}
        currentStatusLabel={currentStatusLabel}
        workspaceId={workspaceId}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  )
}
