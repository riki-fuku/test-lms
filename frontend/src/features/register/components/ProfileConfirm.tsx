import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { useActorStore } from '@/store/actor-store'
import type { FieldValues } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'

type ProfileConfirmProps = {
  form: FieldValues
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit: () => void
}

export default function ProfileConfirm({ form, onBack, onSubmit }: ProfileConfirmProps) {
  const { actor } = useActorStore((state) => state)
  const fullName = form.lastName + ' ' + form.firstName

  function Content({ title, text }: { title: string; text: string }) {
    return (
      <div className='flex items-center gap-5'>
        <label className='w-32 text-md font-bold'>{title}</label>
        <p className={cn(text ? '' : 'text-text-secondary')}>{text ? text : '未入力'}</p>
      </div>
    )
  }

  function ImageContent({
    title,
    content,
  }: {
    title: string
    content: { source: string; file: File }
  }) {
    return (
      <div className='flex items-center gap-5'>
        <p className='w-32 text-md font-bold'>{title}</p>

        {content.source ? (
          <div className='relative size-24'>
            <Image src={content.source} alt='添付画像' className='rounded-full' fill />
          </div>
        ) : (
          <FaUserCircle className='size-24 fill-gray-400' />
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex w-full flex-col gap-8')}>
      <h1 className='text-3xl font-bold'>登録内容の確認</h1>
      <p>下記に入力し、「プロフィールを設定」ボタンをクリックしてください。</p>

      <div className={cn('flex flex-col gap-7 rounded text-md')}>
        <Content title='氏名' text={fullName} />
        <Content title='ニックネーム' text={form.nickName} />
        <Content title='電話番号' text={form.phoneNumber} />
        <Content title='生年月日' text={useDateTools().formatDate(form.birthday, 'YYYY/MM/DD')} />
        <Content title='働き方' text={form.worksStyle !== null ? form.worksStyle.label : ''} />
        {actor && MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
          <Content title='デザイナー歴' text={form.engineerCareer} />
        ) : (
          <Content title='エンジニア歴' text={form.engineerCareer} />
        )}
        <Content title='使用しているPC' text={form.pcInUse !== null ? form.pcInUse.label : ''} />

        <ImageContent title='プロフィール画像' content={form.image} />
        <Content title='自己紹介' text={form.selfIntroduction} />
      </div>
      <div className='flex items-center justify-center gap-5'>
        <Button intent='secondary' onClick={onBack}>
          戻る
        </Button>
        <Button onClick={onSubmit}>プロフィールを設定</Button>
      </div>
    </div>
  )
}
