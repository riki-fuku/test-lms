import Avatar from '@/components/ui/Avatar'
import Textarea from '@/components/ui/Textarea'
import { useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { IoPersonSharp } from 'react-icons/io5'

type TimeLinePostCardFormProps = {
  onSubmit: (value: { text: string }) => void
}

export default function TimeLinePostCardForm(props: TimeLinePostCardFormProps) {
  const [textValue, setTextValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.onSubmit({ text: textValue })
    setTextValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      const formElement = e.currentTarget.form

      if (formElement) {
        formElement.requestSubmit()
      }
    }
  }

  return (
    <div className='border-b px-5 py-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-1 text-sm'>
            <Avatar size='xs'>
              <IoPersonSharp color='#ffffff' />
            </Avatar>
            {/* TODO: ログインユーザーの名前が入ります */}
            <span>岩崎 敬信</span>
          </div>

          <Textarea
            className='border-none text-sm'
            rows={5}
            placeholder='テキストを入力してください'
            onChange={handleChange}
            value={textValue}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className='mt-5 w-full'>
          <FaTelegramPlane className=' ml-auto text-xl text-text-blue-primary' />
        </button>
      </form>
    </div>
  )
}
