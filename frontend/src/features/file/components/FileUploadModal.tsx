import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import InputFile from '@/components/ui/InputFile'
import { useEffect, useRef, useState } from 'react'

export default function FileUploadModal({
  isOpen,
  onClose,
  onSend,
  fileUrls,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  onSend: (files: File[]) => void
  fileUrls?: string[]
  children?: React.ReactNode
}) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [selectedFileArray, setSelectedFileArray] = useState<File[]>([])

  useEffect(() => {
    if (!inputFileRef.current) return
    setSelectedFileArray(inputFileRef.current.files ? Array.from(inputFileRef.current.files) : [])
  }, [inputFileRef.current?.files])

  const handleRemoveImage = (index: number) => {
    if (!inputFileRef.current?.files) return
    const dt = new DataTransfer()
    selectedFileArray.forEach((file, i) => i !== index && dt.items.add(file))
    inputFileRef.current.files = dt.files // input内のFileListを更新
    setFiles(Array.from(dt.files))
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (!inputFileRef.current?.files) return

    const newFileArray = [...selectedFileArray, ...Array.from(e.target.files)].filter(
      (file, index, self) => self.findIndex((f) => f.name === file.name) === index, // 重複を削除
    )

    const dt = new DataTransfer()
    newFileArray.forEach((file) => dt.items.add(file))
    inputFileRef.current.files = dt.files // input内のFileListを更新
    setFiles(Array.from(dt.files))
  }

  return (
    <Modal visible={isOpen} onClose={onClose}>
      <div className='flex flex-col gap-10'>
        <InputFile multiple onChange={handleChangeImage} ref={inputFileRef} />

        <div className='w-fit space-y-3'>
          {files.map((file, index) => (
            <div key={file.name} className='flex items-center justify-between gap-2'>
              <div>{file.name}</div>
              <button className='text-warn-red' onClick={() => handleRemoveImage(index)}>
                削除
              </button>
            </div>
          ))}
        </div>

        <div className='flex w-full flex-col items-center gap-y-2'>
          <Button
            onClick={() => {
              if (!inputFileRef.current) return
              onSend(files)
              setFiles([])
              inputFileRef.current.files = new DataTransfer().files
            }}
            className='w-full'
          >
            送信
          </Button>
          {/* <Link href='/help' target='_blank' className='text-md text-main-color'>
            画像の入れ方がわからない場合
          </Link> */}
        </div>
        {children}
      </div>
      <div>
        <h2 className='text-lg font-bold'>アップロードしたファイル</h2>
        <div className='flex flex-col gap-2'>
          {fileUrls && fileUrls.length > 0 ? (
            fileUrls.map((url, index) => (
              <>
                <div key={index} className='flex items-center gap-4'>
                  <p className='min-w-0 grow break-words'>{`![画像](${new URL(url.replace(' ', '+'))})`}</p>
                  <p
                    onClick={() =>
                      navigator.clipboard.writeText(`![画像](${new URL(url.replace(' ', '+'))})`)
                    }
                  >
                    copy
                  </p>
                </div>
                <Divider />
              </>
            ))
          ) : (
            <p>アップロードしたファイルはありません</p>
          )}
        </div>
      </div>
    </Modal>
  )
}
