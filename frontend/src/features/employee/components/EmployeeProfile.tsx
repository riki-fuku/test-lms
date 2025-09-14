'use client'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import Input from '@/components/ui/Input'
import InputDate from '@/components/ui/InputDate'
import InputSelect from '@/components/ui/InputSelect'
import Textarea from '@/components/ui/Textarea'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import updateEmployee from '@/features/employee/api/updateEmployee'
import useFetchEmployee from '@/features/employee/hooks/useFetchEmployee'
import fileUpload from '@/features/file/api/fileUpload'
import InputImage from '@/features/settings/components/InputImage'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useActorStore } from '@/store/actor-store'
import { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoPersonSharp } from 'react-icons/io5'
import { RiFileEditLine } from 'react-icons/ri'

export default function EmployeeProfile() {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [nickname, setNickname] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [birthDate, setBirthDate] = useState<string | null>(null)
  const [os, setOs] = useState<Option | null>(null)
  const [workStyle, setWorkStyle] = useState<Option | null>(null)
  const [engineerHistory, setEngineerHistory] = useState<string | null>(null)
  const [introduction, setIntroduction] = useState<string | null>(null)
  const [nickNameCount, setNickNameCount] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { showSnackbar } = useSnackbar()

  const { actor } = useActorStore((state) => state)
  const workspaceId = actor?.activeWorkspace.workspaceId ?? ''
  const { data } = useFetchEmployee(workspaceId, actor?.id ?? '')

  useEffect(() => {
    if (data) {
      setLastName(data.lastName)
      setFirstName(data.firstName)
      setNickname(data.nickname)
      setAvatar(data.avatar)
      setPhoneNumber(data.phoneNumber)
      setBirthDate(data.birthDate)
      setWorkStyle({ label: data.workStyle ?? '', value: data.workStyle })
      setEngineerHistory(data.engineerHistory)
      setOs({ label: data.os ?? '', value: data.os })
      setIntroduction(data.introduction)
    }
  }, [data])

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNickNameCount(e.target.value.length)
  }

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value)
  }

  const handleWorkTypeChange = (option: Option | null): void => {
    setWorkStyle(option ?? null)
  }

  const handleOSTypeChange = (option: Option | null): void => {
    setOs(option ?? null)
  }

  const handleChangeExperienceLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEngineerHistory(e.target.value)
  }

  type Option = {
    label: string
    value: unknown
  }

  const workTypeOptions = [
    {
      label: '正社員',
      value: '正社員',
    },
    {
      label: 'フリーランス',
      value: 'フリーランス',
    },
    {
      label: '副業',
      value: '副業',
    },
  ]

  const osTypeOptions = [
    {
      label: 'Windows',
      value: 'Windows',
    },
    {
      label: 'Mac',
      value: 'Mac',
    },
    {
      label: 'その他',
      value: 'その他',
    },
  ]

  const handleChangeSelfIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!actor) {
      throw new Error('Actor is not found')
    }

    if (!firstName || !lastName) {
      showSnackbar('名前を入力してください', 'warning')
      return
    }

    let avatarUrl = null
    if (imageFile) {
      // 複数ファイルを送信に対応、keyを配列で送信する
      const formData = new FormData()
      const extension = imageFile.name.split('.').pop() // 拡張子を取得する
      formData.append('files[]', imageFile, `${actor.id}.${extension}`) // ファイル名をemployeeIdにする
      formData.append('key', `avatar`)
      avatarUrl = await fileUpload(workspaceId, formData)
    }

    await Promise.all([
      updateEmployee(workspaceId, actor.id, {
        firstName,
        lastName,
        nickname: nickname ?? undefined,
        avatar: avatarUrl ? avatarUrl[0] : undefined,
        phoneNumber,
        birthDate,
        workStyle: workStyle?.value as string,
        engineerHistory,
        os: os?.value as string,
        introduction,
      }),
    ])

    showSnackbar('プロフィールを更新しました', 'success')
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
  const inputChildGridLayoutWorkType = 'lg:col-start-2 lg:col-end-4 w-full z-40'

  return (
    <>
      <h1 className='text-xl'>プロフィール設定</h1>
      <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-10'>
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
              onChange={handleChangeNickName}
            />
          </div>
          <div className={cn(inputChildGridLayout, 'flex justify-between')}>
            <div className='text-md text-text-red-primary'></div>
            <p className='text-right text-xs text-secondary'>{nickNameCount}/10</p>
          </div>
        </div>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>電話番号</p>
          </label>
          <div className={inputChildGridLayout}>
            <Input
              className='text-md'
              type='text'
              value={phoneNumber ?? ''}
              onChange={handleChangePhoneNumber}
            />
          </div>
        </div>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>生年月日</p>
          </label>
          <div className={inputChildGridLayout}>
            <InputDate
              value={birthDate}
              type='date'
              className='text-md text-text-primary'
              onChange={handleChangeBirthday}
            />
          </div>
        </div>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>働き方</p>
          </label>
          <div className={inputChildGridLayoutWorkType}>
            <InputSelect
              options={workTypeOptions}
              item={workStyle}
              onChange={handleWorkTypeChange}
            />
          </div>
        </div>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            {actor && MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
              <p>デザイナー歴</p>
            ) : (
              <p>エンジニア歴</p>
            )}
          </label>
          <div className={inputChildGridLayout}>
            <Input
              className='text-md'
              type='text'
              value={engineerHistory ?? ''}
              onChange={handleChangeExperienceLevel}
            />
          </div>
        </div>
        <div className={inputBaseGridLayout}>
          <label className='flex items-center gap-1 text-md'>
            <p>使用しているPC</p>
          </label>
          <div className={inputChildGridLayout}>
            <InputSelect options={osTypeOptions} item={os} onChange={handleOSTypeChange} />
          </div>
        </div>
        <div className={cn(inputBaseGridLayout, 'lg:items-start')}>
          <label className='flex items-center gap-1 text-md' htmlFor='selfIntroduction'>
            <p>自己紹介</p>
          </label>
          <div className={inputChildGridLayout}>
            <Textarea
              className='h-36 text-md focus:ring-0 lg:h-28'
              placeholder='自己紹介'
              value={introduction ?? ''}
              onChange={handleChangeSelfIntroduction}
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
