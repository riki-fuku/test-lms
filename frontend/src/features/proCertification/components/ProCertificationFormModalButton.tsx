'use client'

import { Button } from '@/components/kit'
import { ProCertificationFormModal } from '@/features/proCertification/components'
import type { ProCertification } from '@/features/proCertification/types'
import { useDisclosure } from '@heroui/react'

type ProCertificationFormModalButtonProps = {
  userName?: string
  proCertification?: Pick<ProCertification, 'id'> | null
  workspaceId: string
  userId: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

export function ProCertificationFormModalButton({
  userName,
  proCertification,
  workspaceId,
  userId,
  onSuccess,
  onError,
}: ProCertificationFormModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button color='primary' onPress={onOpen}>
        Pro合格判定変更
      </Button>
      <ProCertificationFormModal
        isOpen={isOpen}
        onClose={onClose}
        userName={userName}
        proCertification={proCertification}
        workspaceId={workspaceId}
        userId={userId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  )
}
