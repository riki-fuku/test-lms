import Button from '@/components/ui/Button'
import InputSearch from '@/components/ui/InputSearch'
import type { TemplateItem } from '@/features/settings/components/coach/ChatMessageTemplateSettingList'
import ChatMessageTemplateSettingList from '@/features/settings/components/coach/ChatMessageTemplateSettingList'
import EditChatMessageTemplate from '@/features/settings/components/coach/EditChatMessageTemplate'
import { useEffect, useState } from 'react'

export default function ChatMessageTemplateSetting() {
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([])
  const [editItem, setEditItem] = useState<TemplateItem | null>(null)
  const [searchResult, setSearchResult] = useState<TemplateItem[]>([])
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // 表示確認用仮データ
    const sampleLength = 15
    const templateItems = Array.from({ length: sampleLength }, (_, i) => ({
      id: i,
      title: '定型文のタイトル' + i.toString(),
      content:
        `{ニックネーム}様 お世話になっております。面談日時の変更承知いたしました。この後、私の方でキャンセル承認しておきます...` +
        i.toString(),
    }))
    setTemplateItems(templateItems)
  }, [])

  useEffect(() => {
    editItem && setIsEdit(true)
  }, [editItem])

  const handleSearch = (value: string) => {
    value
      ? setSearchResult(templateItems.filter((item) => item.title.includes(value)))
      : setSearchResult([])
  }

  const handleEdit = (id: number) => {
    setEditItem(templateItems.find((item) => item.id === id) || null)
  }

  const handleSave = (item: TemplateItem) => {
    editItem
      ? setTemplateItems((prev) =>
          prev.map((templateItem) => (templateItem.id === item.id ? item : templateItem)),
        )
      : setTemplateItems([...templateItems, item])
    setEditItem(null)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    setTemplateItems(templateItems.filter((item) => item.id !== id))
  }

  const handleBack = () => {
    setEditItem(null)
    setIsEdit(false)
  }

  return (
    <>
      {isEdit ? (
        <EditChatMessageTemplate templateItem={editItem} onSave={handleSave} onBack={handleBack} />
      ) : (
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl'>定型文設定</h1>
            <div className='flex items-center gap-2.5'>
              <InputSearch
                className='h-12 w-72 !rounded'
                placeholder='定型文のタイトルを検索'
                onSearch={handleSearch}
                onClear={() => setSearchResult([])}
              />
              <Button className='h-12' onClick={() => setIsEdit(true)}>
                作成
              </Button>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-3 text-text-secondary'>
              <div className='flex h-10 items-center border-y border-r px-5'>タイトル</div>
              <div className='col-span-2 flex h-10 items-center border-y px-5'>メッセージ</div>
            </div>
            <div className=' overflow-scroll'>
              {(searchResult.length > 0 ? searchResult : templateItems).map((templateItem) => (
                <ChatMessageTemplateSettingList
                  key={templateItem.id}
                  templateItem={templateItem}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
