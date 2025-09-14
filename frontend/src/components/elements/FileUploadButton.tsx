import Button from '@/components/elements/Button'
import fileUpload from '@/features/file/api/fileUpload'
import FileUploadModal from '@/features/file/components/FileUploadModal'
import useDisclosure from '@/hooks/useDisclosure'
import { useState } from 'react'

interface FileUploadButtonProps {
  workspaceId: string
  buttonText?: string
  className?: string
}

export default function FileUploadButton({
  workspaceId,
  buttonText = '画像アップロード',
  className = '',
}: FileUploadButtonProps) {
  const fileUploadModal = useDisclosure()
  const [uploadedFilesUrl, setUploadedFilesUrl] = useState<string[]>([])

  const handleSendFile = async (files: File[]) => {
    const data = new FormData()
    files.forEach((file) => {
      data.append('files[]', file)
      data.append('key', 'question')
    })

    const imageUrls = await fileUpload(workspaceId, data)
    setUploadedFilesUrl(imageUrls)
  }

  return (
    <>
      <Button className={className} onClick={fileUploadModal.open}>
        {buttonText}
      </Button>

      <FileUploadModal
        isOpen={fileUploadModal.isOpen}
        onClose={fileUploadModal.close}
        onSend={handleSendFile}
        fileUrls={uploadedFilesUrl}
      />
    </>
  )
}
