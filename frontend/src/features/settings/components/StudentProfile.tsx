'use client'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import Input from '@/components/ui/Input'
import InputDate from '@/components/ui/InputDate'
import Textarea from '@/components/ui/Textarea'
import fileUpload from '@/features/file/api/fileUpload'
import InputImage from '@/features/settings/components/InputImage'
import updateUser from '@/features/user/api/updateUser'
import useFetchUser from '@/features/user/hooks/useFetchUser'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoPersonSharp } from 'react-icons/io5'
import { RiFileEditLine } from 'react-icons/ri'

export default function StudentProfile() {
  // ユーザー情報取得
  const { user, setUser } = useUserStore((state) => state)
  const userId = user?.id ?? ''
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''

  const { data: userData, mutate: mutateUser } = useFetchUser(workspaceId, userId)

  const { showSnackbar } = useSnackbar()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [nickname, setNickname] = useState<string | null>(null)
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>(null)
  const [nickNameCount, setNicknameCount] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ;(async () => {
      if (!userData) return

      setLastName(userData.lastName)
      setFirstName(userData.firstName)
      setNickname(userData.nickname)
      setAvatar(userData.avatar)
      setBirthday(userData.birthDate ? new Date(userData.birthDate) : null)
      setSelfIntroduction(userData.introduction)
    })()
  }, [userData])

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNicknameCount(e.target.value.length)
  }

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(new Date(e.target.value))
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelfIntroduction(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userData) {
      throw new Error('User ID is not found')
    }

    if (firstName == '' || lastName == '') {
      showSnackbar('名前を入力してください', 'warning')
      return
    }

    let avatarUrl = null
    if (imageFile) {
      // 複数ファイルを送信に対応、keyを配列で送信する
      const formData = new FormData()
      const extension = imageFile.name.split('.').pop() // 拡張子を取得する
      formData.append('files[]', imageFile, `${userData.id}.${extension}`) // ファイル名をuserIdにする
      formData.append('key', `avatar`)
      avatarUrl = await fileUpload(workspaceId, formData)
    }

    Promise.all([
      await updateUser(workspaceId, userId, {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        nickname: nickname || undefined,
        avatar: avatarUrl ? avatarUrl[0] : undefined,
        birthDate: birthday ? dayjs(birthday).format('YYYY-MM-DD') : null,
        introduction: selfIntroduction || undefined,
      }),
    ]).then(() => {
      if (!user) {
        return
      }

      setUser({
        ...user,
        firstName,
        lastName,
        nickname,
        avatar: avatarUrl ? avatarUrl[0] : undefined,
        birthDate: birthday ? dayjs(birthday).format('YYYY-MM-DD') : null,
        introduction: selfIntroduction || null,
      })
      showSnackbar('プロフィールを更新しました', 'success')
      mutateUser()
    })
  }

  const handleChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0]
      setImageFile(targetFile)
      setAvatar(URL.createObjectURL(targetFile))
    }
  }

  const handleChangeImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const inputBaseGridLayout = 'flex flex-col lg:grid lg:grid-cols-3 lg:items-center gap-1'
  const inputChildGridLayout = 'lg:col-start-2 lg:col-end-4 w-full'
  return (
    <>
      <h1 className='text-xl'>プロフィール設定</h1>
      <form className='mt-12 flex flex-col gap-10' onSubmit={handleSubmit}>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>プロフィール画像</p>
          </label>
          <div className={inputChildGridLayout}>
            <div
              className='relative inline-block w-auto cursor-pointer'
              onClick={handleChangeImageClick}
            >
              {avatar ? (
                <Avatar size='xxl'>
                  {avatar ? (
                    <Image src={avatar} alt='プロフィール画像' fill />
                  ) : (
                    <IoPersonSharp color='#ffffff' />
                  )}
                </Avatar>
              ) : (
                <FaUserCircle className='size-24 w-full fill-gray-400' />
              )}

              <RiFileEditLine className='absolute bottom-0 left-16 size-10 rounded-full bg-white p-2 text-blue-600' />
              <InputImage ref={fileInputRef} onChange={handleChangeImageFile} />
            </div>
          </div>
        </div>

        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>名前</p>
          </label>
          <div className={cn(inputChildGridLayout, 'flex gap-5')}>
            <Input
              className='w-full text-md'
              type='text'
              placeholder='山田'
              value={lastName ?? ''}
              onChange={handleChangeLastName}
            />

            <Input
              className='w-full text-md'
              type='text'
              placeholder='太郎'
              value={firstName ?? ''}
              onChange={handleChangeFirstName}
            />
          </div>
        </div>

        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>ニックネーム</p>
          </label>
          <div className={inputChildGridLayout}>
            <Input
              className='text-md'
              type='text'
              placeholder='ニックネーム'
              value={nickname ?? ''}
              onChange={handleChangeNickname}
            />
          </div>
          <div className={cn(inputChildGridLayout, 'flex justify-between')}>
            <div className='text-md text-text-red-primary'></div>
            <p className='text-secondary text-right text-xs'>{nickNameCount}/10</p>
          </div>
        </div>

        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>生年月日</p>
          </label>
          <div className={inputChildGridLayout}>
            <InputDate
              value={birthday}
              type='date'
              className='text-md text-text-primary'
              onChange={handleChangeBirthday}
            />
          </div>
          <div className={cn(inputChildGridLayout, 'text-md text-text-red-primary')}></div>
        </div>

        <div className={cn(inputBaseGridLayout, 'lg:items-start')}>
          <label className='flex items-center gap-1 text-md' htmlFor='selfIntroduction'>
            <p>自己紹介</p>
          </label>
          <div className={inputChildGridLayout}>
            <Textarea
              className='h-36 text-md focus:ring-0 lg:h-28'
              placeholder='自己紹介'
              value={selfIntroduction ?? ''}
              onChange={handleChangeText}
            />
          </div>
        </div>

        <div className='mr-auto mt-10'>
          <Button>保存</Button>
        </div>
      </form>
    </>
  )
}
