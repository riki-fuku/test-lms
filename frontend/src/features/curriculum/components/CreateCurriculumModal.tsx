import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import fileUpload from '@/features/file/api/fileUpload'
import FileUploadModal from '@/features/file/components/FileUploadModal'
import useDisclosure from '@/hooks/useDisclosure'
import { useState } from 'react'

type CreateCurriculumModalProps = {
  workspaceId: string
  visible: boolean
  onClose: () => void
  onSave: (
    title: string,
    isPublic: boolean,
    order: number,
    detail: string,
    eyeCatchUrl: string,
  ) => void
}

export default function CreateCurriculumModal({
  workspaceId,
  visible,
  onClose,
  onSave,
}: CreateCurriculumModalProps) {
  const [title, setTitle] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [order, setOrder] = useState(0)
  const [detail, setDetail] = useState('')
  const [eyeCatchUrl, setEyeCatchUrl] = useState('')
  const [uploadedFilesUrl, setUploadedFilesUrl] = useState<string[]>([])
  const fileUploadModal = useDisclosure()

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(title, isPublic, order, detail, eyeCatchUrl)
    onClose()
  }

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
      <Modal visible={visible}>
        <div className='mb-8 flex flex-col gap-8'>
          <h1 className='text-2xl font-bold'>チュートリアル作成</h1>
          <label htmlFor='title'>タイトル</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor='isPublic'>表示状態</label>
          <div className='flex items-center gap-4'>
            <select
              id='isPublic'
              value={isPublic ? 'true' : 'false'}
              onChange={(e) => setIsPublic(e.target.value === 'true')}
              className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
            >
              <option value='true'>公開中</option>
              <option value='false'>非公開</option>
            </select>
          </div>
          <label>表示順</label>
          <Input
            type='number'
            value={String(order)}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
          <label>チュートリアルの説明</label>
          <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} />
          <label>チュートリアルのサムネイルURL</label>
          <Input value={eyeCatchUrl} onChange={(e) => setEyeCatchUrl(e.target.value)} />
          <Button className='bottom-4' onClick={fileUploadModal.open}>
            画像アップロード
          </Button>
        </div>
        <div className='mx-auto flex justify-center gap-5'>
          <Button onClick={handleCancelButton}>キャンセル</Button>
          <Button onClick={handleSaveButton}>保存</Button>
        </div>
      </Modal>

      <FileUploadModal
        isOpen={fileUploadModal.isOpen}
        onClose={fileUploadModal.close}
        onSend={handleSendFile}
        fileUrls={uploadedFilesUrl}
      />
    </>
  )
}
