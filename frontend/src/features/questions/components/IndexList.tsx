// import ButtonFilter from '@/components/ui/ButtonFilter'
// import ButtonSort from '@/components/ui/ButtonSort'
import InputSearch from '@/components/ui/InputSearch'
import PaginationList from '@/components/ui/Pagination'
import QuestionCardList from '@/features/questions/components/QuestionCardList'
import SortTabList from '@/features/questions/components/SortTabList'
import questionTab from '@/features/questions/constants/questionTab'
import useFetchQuestions from '@/features/questions/hooks/useFetchQuestions'
import type { QuestionTab } from '@/features/questions/types/QuestionTab'
import { useEffect, useMemo, useState } from 'react'

type IndexListProps = {
  isUser: boolean
  workspaceId: string
  className?: string
}

export default function IndexList({ isUser, workspaceId, className }: IndexListProps) {
  const [selectedTab, setSelectedTab] = useState<QuestionTab>(questionTab.NEW)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const { data: questionsData } = useFetchQuestions(
    workspaceId,
    {
      page,
      filterType: selectedTab.key,
      keyword,
      guardType: isUser ? 'user' : 'employee',
    },
    {
      revalidateOnFocus: false,
    },
  )

  const questions = useMemo(() => {
    return questionsData?.data ?? []
  }, [questionsData])
  const meta = questionsData?.meta

  useEffect(() => {
    const baseContainer = document.getElementById('baseContainer')
    baseContainer && baseContainer.scrollTo({ top: 0, behavior: 'auto' })
  }, [questions])

  const handleSearch = (value: string) => {
    setPage(1)
    setKeyword(value)
  }

  const handleClickTab = (tab: QuestionTab) => {
    setPage(1)
    setSelectedTab(tab)
  }

  const handleClickPagination = (page: number) => {
    setPage(page)
  }

  return (
    <div className={`w-full rounded-sm bg-white ${className}`}>
      <div className='px-0 py-8 lg:px-5'>
        <div className='mx-auto w-11/12 lg:w-full'>
          <p className='font-bold'>質問一覧</p>
          <InputSearch
            placeholder='質問を検索'
            className='my-5 rounded-sm'
            value={keyword}
            onSearch={handleSearch}
          />
        </div>
        {/* <div className='flex justify-end'>
          <ButtonFilter />
          <ButtonSort className='hidden lg:flex' />
        </div> */}
        <SortTabList selectedTab={selectedTab} onTabClick={handleClickTab} />

        {questions.length === 0 ? (
          <p className='py-8 text-center text-gray-500'>質問がありません</p>
        ) : (
          <QuestionCardList isUser={isUser} workspaceId={workspaceId} questions={questions ?? []} />
        )}

        <div className='mt-7 flex justify-center'>
          {meta && (
            <PaginationList
              displayPageCount={6}
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
              onClick={handleClickPagination}
            />
          )}
        </div>
      </div>
    </div>
  )
}
