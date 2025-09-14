import Textarea from '@/components/ui/Textarea'
import { ChatFooter } from '@/features/chat/components'
import { useAsyncSafeAction } from '@/hooks/useAsyncSafeAction'
import { useState } from 'react'

type ChatMessageFormProps = {
  onSendMessage: (message: string) => void
  onSendImage: (files: File[]) => void
}

export const ChatMessageForm: React.FC<ChatMessageFormProps> = ({ onSendMessage, onSendImage }) => {
  const [input, setInput] = useState<string>('')

  const [action, isLoading] = useAsyncSafeAction(onSendMessage)

  const handleSendMessage = async () => {
    if (isLoading) return // NOTE: 本来はいらないが、複数リクエストを送信した際にsetInputが走り入力内容が消えるため
    await action(input)
    setInput('')
  }

  const handleKeydown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage()
    }
  }

  return (
    <>
      <Textarea
        value={input}
        className='h-40 shrink-0 border-none'
        placeholder='メッセージを入力'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeydown}
      />
      <ChatFooter onSendMessage={handleSendMessage} onSendImage={onSendImage} />
    </>
  )
}
