'use client'

import type { ModalProps } from '@heroui/react'
import {
  Modal as HeroModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'

type FooterProps = {
  onClose?: () => void
}

type Props = Omit<ModalProps, 'children'> & {
  isOpen: boolean
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: (props: FooterProps) => React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export function Modal({
  isOpen,
  header,
  body,
  scrollBehavior,
  footer,
  onSubmit = () => {},
  ...props
}: Props) {
  return (
    <>
      <HeroModal isOpen={isOpen} scrollBehavior={scrollBehavior} {...props}>
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={onSubmit}
              className={`flex flex-1 flex-col ${
                scrollBehavior === 'inside' ? 'overflow-y-auto' : ''
              }`}
            >
              {header && <ModalHeader className='text-xl font-bold'>{header}</ModalHeader>}
              {body && <ModalBody>{body}</ModalBody>}
              {footer && <ModalFooter>{footer({ onClose })}</ModalFooter>}
            </form>
          )}
        </ModalContent>
      </HeroModal>
    </>
  )
}
