import type { MessageTemplateType } from '@/features/chat/components/MessageTemplate'
import MessageTemplate from '@/features/chat/components/MessageTemplate'
import { useState } from 'react'

type MessageTemplateListProps = {
  templates: MessageTemplateType[]
  onSelect: (template: MessageTemplateType) => void
}

export default function MessageTemplateList({ templates, onSelect }: MessageTemplateListProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplateType | null>(null)

  const handleSelectTemplate = (template: MessageTemplateType) => {
    setSelectedTemplate(template)
    onSelect(template)
  }

  return (
    <div className='flex flex-1 flex-col overflow-y-scroll rounded border'>
      {templates.map((template, index) => (
        <MessageTemplate
          key={index}
          template={template}
          isSelected={selectedTemplate !== null ? selectedTemplate.id === template.id : false}
          onClick={handleSelectTemplate}
        />
      ))}
    </div>
  )
}
