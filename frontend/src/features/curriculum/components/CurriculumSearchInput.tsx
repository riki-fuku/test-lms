'use client'

import { Input, Modal } from '@/components/kit'
import Button from '@/components/ui/Button'
import searchCurriculums from '@/features/curriculum/api/searchCurriculums'
import CurriculumSearchResult from '@/features/curriculum/components/CurriculumSearchResult'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import useDisclosure from '@/hooks/useDisclosure'
import { useLoading } from '@/hooks/useLoading'
import { useCallback, useState } from 'react'

export default function CurriculumSearchInput({ workspaceId }: { workspaceId: string }) {
  const { isOpen, open, close } = useDisclosure(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResult, setSearchResult] = useState<Curriculum[]>([])
  const loading = useLoading()

  const handleSearch = useCallback(
    async (keyword: string) => {
      if (!keyword.trim()) return

      try {
        loading.start()
        const result = await searchCurriculums(workspaceId, { keyword })
        setSearchResult(result)
        open()
      } finally {
        loading.end()
      }
    },
    [workspaceId, loading, open],
  )

  const handleClear = useCallback(() => {
    setSearchKeyword('')
  }, [])

  return (
    <>
      <Input
        value={searchKeyword}
        placeholder='教材を検索'
        className='w-full'
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch(searchKeyword)
          }
        }}
        onClear={handleClear}
        isClearable
      />
      <Modal
        isOpen={isOpen}
        onClose={close}
        header='検索結果'
        scrollBehavior='inside'
        className='w-[800px] max-w-full'
        body={
          searchResult.length > 0 ? (
            <CurriculumSearchResult searchResult={searchResult} workspaceId={workspaceId} />
          ) : (
            <div className='flex items-center justify-center py-8'>
              <p className='text-gray-500'>検索結果がありません</p>
            </div>
          )
        }
        footer={({ onClose }) => (
          <Button intent='secondary' type='button' onClick={onClose}>
            閉じる
          </Button>
        )}
      />
    </>
  )
}
