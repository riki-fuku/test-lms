import cn from '@/hooks/cn'

export type MessageTemplateType = {
  id: number
  title: string
  content: string
}

type MessageTemplateProps = {
  template: MessageTemplateType
  isSelected: boolean
  onClick: (template: MessageTemplateType) => void
}

export default function MessageTemplate({ template, isSelected, onClick }: MessageTemplateProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-b p-2.5 last:border-none',
        isSelected && 'bg-bg-secondary',
      )}
      onClick={() => onClick(template)}
    >
      <h1 className='text-md'>{template.title}</h1>
      <p className='text-sm text-form-gray'>
        {template.content.slice(0, 40).length < template.content.length
          ? template.content.slice(0, 40) + '...'
          : template.content}
      </p>
    </div>
  )
}
