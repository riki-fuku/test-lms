import Button from '@/components/ui/Button'
import InputSearch from '@/components/ui/InputSearch'
import AddTag from '@/features/settings/components/coach/AddTag'
import EditTag from '@/features/settings/components/coach/EditTag'
import type { Tag, User } from '@/features/settings/components/coach/TagSettingList'
import TagSettingList from '@/features/settings/components/coach/TagSettingList'
import { useEffect, useState } from 'react'

export default function TagSetting() {
  const [tagItems, setTagItems] = useState<Tag[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [editItem, setEditItem] = useState<Tag | null>(null)
  const [searchResult, setSearchResult] = useState<Tag[]>([])
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // 表示確認用仮データ
    const tagName = [
      '転職成功',
      'Pro合格',
      'Pro再受験中（6ヶ月）',
      '副業活動中',
      '転職活動中',
      'フリーランス',
      '勉強大好き',
      'モチベ高',
    ]
    const author = ['admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'coach', 'coach']
    const userName = ['山田 太郎', '山本 次郎', '村上 春', '福山 健三郎']
    const userRoman = ['Taro', 'Jiro', 'Haru', 'Kenzaburo']
    const users = Array.from({ length: userName.length }, (_, j) => ({
      id: j,
      name: userName[j],
      roman: userRoman[j],
      avatar: '',
    }))
    const tagItems: Tag[] = Array.from({ length: tagName.length }, (_, i) => ({
      id: i,
      title: tagName[i],
      author: author[i] as 'admin' | 'coach',
      users,
    }))
    setTagItems(tagItems)
    setAllUsers(users)
  }, [])

  useEffect(() => {
    editItem && setIsEdit(true)
  }, [editItem])

  const handleSearch = (value: string) => {
    value
      ? setSearchResult(tagItems.filter((item) => item.title.includes(value)))
      : setSearchResult([])
  }

  const handleEdit = (id: number) => {
    setEditItem(tagItems.find((item) => item.id === id) || null)
  }
  const handleCreate = (tagItem: Tag) => {
    setTagItems((prev) => [...prev, tagItem])
    setIsOpenAdd(false)
  }

  const handleSave = (id: number, title: string) => {
    editItem &&
      setTagItems((prev) =>
        prev.map((tagItem) => (tagItem.id === id ? { ...tagItem, title } : tagItem)),
      )
    setEditItem(null)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    setTagItems(tagItems.filter((item) => item.id !== id))
    setEditItem(null)
    setIsEdit(false)
  }

  const handleBack = () => {
    setEditItem(null)
    setIsEdit(false)
  }

  return (
    <>
      {isOpenAdd ? (
        <AddTag allUsers={allUsers} onBack={() => setIsOpenAdd(false)} onCreate={handleCreate} />
      ) : isEdit && editItem ? (
        <EditTag
          tagItem={editItem}
          onSave={handleSave}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      ) : (
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl'>タグ設定</h1>
            <div className='flex items-center gap-2.5'>
              <InputSearch
                className='h-12 w-72 !rounded'
                placeholder='タグのタイトルを検索'
                onSearch={handleSearch}
                onClear={() => setSearchResult([])}
              />
              <Button className='h-12' onClick={() => setIsOpenAdd(true)}>
                作成
              </Button>
            </div>
          </div>

          <div>
            <div className='grid grid-cols-3 text-text-secondary'>
              <div className='flex h-10 items-center border-y border-r px-5'>タイトル</div>
              <div className='col-span-2 flex h-10 items-center border-y px-5'>メッセージ</div>
            </div>
            <div className='overflow-scroll'>
              {(searchResult.length > 0 ? searchResult : tagItems).map((tagItem) => (
                <TagSettingList
                  key={tagItem.id}
                  tag={tagItem}
                  onEdit={handleEdit}
                  onDelete={() => setTagItems(tagItems.filter((item) => tagItem.id !== item.id))}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
