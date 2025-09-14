'use client'

import type { ButtonProps } from '@/components/kit'
import { Button } from '@/components/kit'
import type { ApplicationInterviewEmployeeToggleActiveModalProps } from '@/features/applicationInterviewEmployee/components'
import { ApplicationInterviewEmployeeToggleActiveModal } from '@/features/applicationInterviewEmployee/components'
import useDisclosure from '@/hooks/useDisclosure'

type Props = Omit<ButtonProps, 'children'> &
  Omit<ApplicationInterviewEmployeeToggleActiveModalProps, 'isOpen' | 'onClose'>

export function ApplicationInterviewEmployeeToggleActiveModalButton({
  workspaceId,
  applicationTypeId,
  applicationInterviewEmployee,
  onEnableSuccess,
  onDisableSuccess,
  ...props
}: Props) {
  const { isOpen, open, close } = useDisclosure(false)

  return (
    <>
      <Button onPress={open} {...props}>
        切り替え
      </Button>
      <ApplicationInterviewEmployeeToggleActiveModal
        workspaceId={workspaceId}
        applicationTypeId={applicationTypeId}
        applicationInterviewEmployee={applicationInterviewEmployee}
        isOpen={isOpen}
        onClose={close}
        onEnableSuccess={() => {
          close()
          onEnableSuccess?.()
        }}
        onDisableSuccess={() => {
          close()
          onDisableSuccess?.()
        }}
      />
    </>
  )
}
