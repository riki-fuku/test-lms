import FileUploadModal from '@/features/file/components/FileUploadModal'
import useDisclosure from '@/hooks/useDisclosure'
import { GrImage } from 'react-icons/gr'
import { RiSendPlaneFill } from 'react-icons/ri'

type ChatFooterProps = {
  onSendMessage: () => void
  onSendImage: (files: File[]) => void
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ onSendMessage, onSendImage }) => {
  const fileUploadModal = useDisclosure()

  return (
    <>
      <div className='flex h-12 items-center justify-between border-y bg-white'>
        <div className='flex items-center'>
          <div className='flex size-12 items-center justify-center' onClick={fileUploadModal.open}>
            <GrImage className='size-5 text-text-secondary' />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='flex size-12 items-center justify-center' onClick={onSendMessage}>
            <RiSendPlaneFill className='size-5 fill-main-color' />
          </div>
        </div>
      </div>

      <FileUploadModal
        isOpen={fileUploadModal.isOpen}
        onClose={fileUploadModal.close}
        onSend={onSendImage}
      />
    </>
  )
}
