'use client'

import Button from '@/components/ui/Button'
import AddTemplate from '@/features/chat/components/AddTemplate'
import type { MessageTemplateType } from '@/features/chat/components/MessageTemplate'
import MessageTemplateDisplay from '@/features/chat/components/MessageTemplateDisplay'
import MessageTemplateList from '@/features/chat/components/MessageTemplateList'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

type TemplateProps = {
  templates: MessageTemplateType[]
  onSetTemplate: (template: MessageTemplateType) => void
  onCloseModal: () => void
}

export default function Template({ templates, onSetTemplate, onCloseModal }: TemplateProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplateType | null>(null)
  const [isAddTemplate, setIsAddTemplate] = useState(false)

  function handleCloseModal() {
    setSelectedTemplate(null)
    setIsAddTemplate(false)
    onCloseModal()
  }

  return (
    <div className='relative pb-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='py-5 text-xl font-bold'>
          {isAddTemplate ? '新しい定型文を追加' : '定型文 ' + templates?.length + '件'}
        </h1>
        <IoClose className='size-6' onClick={handleCloseModal} />
      </div>

      {!isAddTemplate ? (
        <div className='grid grid-cols-2 gap-5'>
          <div className='flex h-96 flex-1 flex-col'>
            <MessageTemplateList
              templates={templates}
              onSelect={(template) => setSelectedTemplate(template)}
            />
            <div
              className='flex h-12 items-center gap-2.5 px-3.5 text-form-gray'
              onClick={() => setIsAddTemplate(true)}
            >
              <HiPlus className='size-5' />
              <p>新しい定型文を追加</p>
            </div>
          </div>
          <div className='flex h-96 flex-col gap-5'>
            <MessageTemplateDisplay template={selectedTemplate} />
            <Button
              className='h-12 w-full'
              disabled={selectedTemplate === null}
              onClick={() => selectedTemplate !== null && onSetTemplate(selectedTemplate)}
            >
              選択
            </Button>
          </div>
        </div>
      ) : (
        <AddTemplate onCancel={() => setIsAddTemplate(false)} />
      )}
    </div>
  )
}
