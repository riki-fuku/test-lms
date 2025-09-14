import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import type { Article } from '@/features/help/types/Article'
import { useState } from 'react'

type ArticleModalProps = {
  article: Article
  visible: boolean
  onClose: () => void
  onSave: (content: string) => void
}

export default function ArticleModal({ article, visible, onClose, onSave }: ArticleModalProps) {
  const [articleContent, setArticleContent] = useState(article.content)

  const handleCancelButton = () => {
    onClose()
  }

  const handleSaveButton = async () => {
    await onSave(articleContent)
    onClose()
  }

  return (
    <>
      <Modal visible={visible}>
        <div className='mb-8 flex flex-col gap-8'>
          <h2 className='text-xl font-bold'>{article.title}</h2>
          <Textarea
            rows={14}
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          />
        </div>
        <div className='mx-auto flex justify-center gap-5'>
          <Button onClick={handleCancelButton}>キャンセル</Button>
          <Button onClick={handleSaveButton}>保存</Button>
        </div>
      </Modal>
    </>
  )
}
