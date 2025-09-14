import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Check from '@/components/ui/Check'
import Image from '@/components/ui/Image'
import Textarea from '@/components/ui/Textarea'
import type { Employee } from '@/features/employee/types'
import type { CreateQuestionAnswerBody } from '@/features/questions/api/createQuestionAnswer'
import createQuestionAnswer from '@/features/questions/api/createQuestionAnswer'
import MarkdownToggle from '@/features/questions/components/MarkdownToggle'
import type { User } from '@/features/user/types/User'
import { useSnackbar } from '@/hooks/useSnackbar'
import Link from 'next/link'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

type NewAnswerBoxProps = {
  isUser: boolean
  loginUser:
    | Pick<User, 'avatar' | 'nickname' | 'name'>
    | Pick<Employee, 'avatar' | 'nickname' | 'name'>
  workspaceId: string
  questionId: string
  onCreateAnswer: () => void
}

export default function NewAnswerBox({
  isUser,
  loginUser,
  workspaceId,
  questionId,
  onCreateAnswer,
}: NewAnswerBoxProps) {
  const [activeTab, setActiveTab] = useState('markdown')
  const [inputText, setInputText] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { showSnackbar } = useSnackbar()

  const handleSendAnswer = async () => {
    if (inputText === '') {
      showSnackbar('コメントを入力してください', 'warning')
      return
    }
    setIsCreating(true)
    try {
      const body: CreateQuestionAnswerBody = {
        content: inputText,
        guardType: isUser ? 'user' : 'employee',
        policyAgreedAt: new Date().toISOString(),
      }
      await createQuestionAnswer(workspaceId, questionId, body)
      showSnackbar('回答を作成しました', 'success')
      setInputText('')
      onCreateAnswer()
    } catch (error) {
      console.error(error)
      showSnackbar('回答を作成できませんでした', 'error')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='flex flex-col border-weakGrey'>
      <div className='mb-2 flex w-full items-center justify-between lg:mb-0 lg:gap-5'>
        <div className='flex items-center gap-2'>
          <Avatar className='bg-white' size='xs'>
            {loginUser.avatar ? (
              <Image src={loginUser.avatar} alt='Avatar' fill />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-weakBlack' />
            )}
          </Avatar>
          <p className='text-sm'>{loginUser.nickname ?? loginUser.name ?? ''}</p>
        </div>
        <MarkdownToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* テキストエリアは常に表示 */}
      <Textarea
        rows={12}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='回答を入力してください'
        className={`${activeTab === 'markdown' ? 'block' : 'hidden'} `}
      />
      {/* プレビュー表示はactiveTabがpreviewのときのみ表示 */}
      {activeTab === 'preview' && (
        <div className='p-2'>
          <MarkDown2HTML>{inputText}</MarkDown2HTML>
        </div>
      )}
      <div className='mt-4 text-right lg:mt-0'>
        <Link
          href='https://lms.coachtech.site/renewal/01jk3m1df0x0tj5hx5w651hmrp/help/categories/01JK3MD8YNVY16WHMZJQHCZKCD/chapters/01JK3MD8YR4WWT39FX3YHV6FF7/articles/01JK3MD8YYVK39363TPESFHRMZ/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline text-xs text-weakBlack underline-offset-2 hover:underline focus-visible:underline'
        >
          マークダウンガイド
        </Link>
      </div>
      <div>
        <div
          className='my-2 flex items-center justify-center gap-2 text-xs lg:my-5'
          onClick={() => setIsChecked(!isChecked)}
        >
          <Check value={isChecked} size='xs' />
          <p className='cursor-pointer'>
            <span>
              <a className='text-mainColor underline' href='/'>
                行動規約
              </a>
            </span>
            の内容に同意します。
          </p>
        </div>
        <Button
          className='mx-auto w-full lg:w-44'
          size='md'
          disabled={!isChecked || isCreating}
          onClick={handleSendAnswer}
        >
          回答する
        </Button>
      </div>
    </div>
  )
}
