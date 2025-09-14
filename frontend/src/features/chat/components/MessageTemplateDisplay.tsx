import Image from '@/components/ui/Image'
import type { MessageTemplateType } from '@/features/chat/components/MessageTemplate'

type MessageTemplateDisplayProps = {
  template: MessageTemplateType | null
}

export default function MessageTemplateDisplay({ template }: MessageTemplateDisplayProps) {
  const addressString = '{ニックネーム}様'

  return (
    <div className='relative flex flex-1 overflow-y-scroll pr-2.5'>
      {template !== null && (
        <>
          <div className='absolute right-0 top-2 h-4 w-3 -scale-x-100'>
            <Image src='/images/tip1.png' alt='tip1' fill />
          </div>
          <div className='flex flex-1 flex-col gap-1 overflow-y-scroll rounded bg-bg-primary p-2.5 text-md'>
            <p className='mb-5'>{addressString}</p>
            <p className=' whitespace-pre-line'>{template.content}</p>
          </div>
        </>
      )}
    </div>
  )
}
