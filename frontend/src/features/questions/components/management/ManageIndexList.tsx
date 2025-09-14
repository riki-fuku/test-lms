import ButtonFilter from '@/components/ui/ButtonFilter'
import ButtonSort from '@/components/ui/ButtonSort'
import InputSearch from '@/components/ui/InputSearch'
import PaginationList from '@/components/ui/Pagination'
import ManageQuestionCardList from '@/features/questions/components/management/ManageQuestionCardList'
import ManageSortTabList from '@/features/questions/components/management/ManageSortTabList'
import manageQuestionTab from '@/features/questions/constants/manageQuestionTab'
import useFetchManageQuestions from '@/features/questions/hooks/useFetchManageQuestions'
import type { QuestionTab } from '@/features/questions/types/QuestionTab'
import Link from 'next/link'
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'

type ManageIndexListProps = {
  className?: string
  workspaceId: string
}

const ManageIndexList = forwardRef(({ workspaceId, className }: ManageIndexListProps, ref) => {
  const [selectedTab, setSelectedTab] = useState<QuestionTab>(manageQuestionTab.NEEDS_ACTION)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)

  const { data: questionsData, mutate: questionsMutate } = useFetchManageQuestions(
    workspaceId,
    {
      page,
      filterType: selectedTab.key,
      keyword,
    },
    {
      revalidateOnFocus: false,
    },
  )

  const questions = useMemo(() => {
    return questionsData?.data ?? []
  }, [questionsData])
  const meta = questionsData?.meta

  // 親コンポーネントからアクセスできる関数
  useImperativeHandle(ref, () => ({
    refreshQuestions: () => {
      questionsMutate()
    },
  }))

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
          <div className='flex gap-5'>
            <p className='font-bold'>質問一覧</p>
            <Link href='/curriculums'>教材一覧</Link>
          </div>

          <InputSearch
            placeholder='質問を検索'
            className='my-5 rounded-sm'
            value={keyword}
            onSearch={handleSearch}
          />
        </div>
        <div className='flex justify-end'>
          <ButtonFilter />
          <ButtonSort className='hidden lg:flex' />
        </div>
        {meta && (
          <ManageSortTabList
            selectedTab={selectedTab}
            onTabClick={handleClickTab}
            needsActionCount={meta.count.needsActionCount}
            waitingUserReplyCount={meta.count.waitingUserReplyCount}
          />
        )}

        <ManageQuestionCardList
          workspaceId={workspaceId}
          questions={questions}
          onUpdateQuestion={questionsMutate}
        />

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
})

ManageIndexList.displayName = 'ManageIndexList'
export default ManageIndexList
