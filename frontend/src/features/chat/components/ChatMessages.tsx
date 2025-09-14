import { Message } from '@/features/chat/components'
import type { ChatMessage } from '@/features/chat/types/ChatMessage'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { forwardRef, useCallback, useRef } from 'react'

type ChatMessagesProps = {
  messages: ChatMessage[]
  onFetchMore: () => void
  onDeleteMessage: () => void
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, onFetchMore, onDeleteMessage }, ref) => {
    const dateTools = useDateTools()

    const observer = useRef<IntersectionObserver | null>(null)
    const lastElementRef = useCallback(
      (node: Element | null) => {
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(async (entries) => {
          if (entries[0].isIntersecting) {
            onFetchMore()
          }
        })

        if (node) observer.current.observe(node)
      },
      [onFetchMore],
    )

    const checkDateChange = useCallback(
      (currentDate: string, prevDate: string) => {
        return !dateTools.isSameDay(new Date(currentDate), new Date(prevDate))
      },
      [dateTools],
    )

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'flex h-0 grow flex-col gap-2.5 overflow-x-auto border-b bg-white px-5 py-2.5 lg:h-auto',
          )} // h-0 lg:h-auto: レスポンシブ時にh-0を設定しなければ適切に高さが設定されない
        >
          {messages.map((message, index) => {
            const isLastMessage = index === 0

            return (
              <div
                key={index}
                className='grid grid-cols-3 gap-2.5'
                ref={isLastMessage ? lastElementRef : null}
              >
                {index > 0 &&
                  checkDateChange(message.createdAt, messages[index - 1]?.createdAt) && (
                    <div className='col-start-2 flex justify-center'>
                      <div className={cn('flex justify-center rounded-full bg-form-gray py-1')}>
                        <p className='text-nowrap px-2 text-md'>
                          {dateTools.formatDate(message.createdAt, 'MM月DD日(ddd)')}
                        </p>
                      </div>
                    </div>
                  )}
                <Message message={message} onDeleteMessage={onDeleteMessage} />
              </div>
            )
          })}
        </div>
      </>
    )
  },
)
ChatMessages.displayName = 'ChatMessages'
export default ChatMessages
