import Avatar from '@/components/ui/Avatar'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi'

type PaginationListProps = {
  displayPageCount: number
  currentPage: number
  lastPage: number
  symbol?: string
  onClick: (page: number) => void
  className?: string
}

export default function PaginationList(props: PaginationListProps) {
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)

  useEffect(() => {
    updatePrevVisibility()
    updateNextVisibility()
  }, [props.currentPage, props.lastPage])

  function updatePrevVisibility() {
    // 最初のページが表示されているときは、prevボタンを非表示にする
    if (props.currentPage !== 1) {
      setPrev(true)
    } else {
      setPrev(false)
    }
  }

  function updateNextVisibility() {
    // 最後のページが表示されているときは、nextボタンを非表示にする
    if (props.currentPage !== props.lastPage) {
      setNext(true)
    } else {
      setNext(false)
    }
  }

  function generatePageLinks() {
    // currentPageから表示をずらす設定
    const diff = 1
    // 基準の数値の算出
    let baseNum = 1

    if (props.currentPage === 1) {
      baseNum = 1
    }
    // 表示させるページがずらす件数より小さい場合は最初のページを表示
    else if (props.currentPage <= diff) {
      baseNum = 1
    }
    // (表示件数+選択したページ)がページ総数を超える時
    else if (props.lastPage < props.currentPage + props.displayPageCount - diff) {
      baseNum = props.lastPage - props.displayPageCount + 1
    } else {
      baseNum = props.currentPage - diff
    }

    // 1〜props.lastPageの範囲外のリンクを生成しないようにする
    return Array.from({ length: props.displayPageCount }, (_, index) => baseNum + index).filter(
      (page) => page <= props.lastPage && page > 0,
    )
  }

  function handleClick(page: number) {
    props.onClick(page)
  }

  function handleClickFirstPageButton() {
    props.onClick(1)
  }

  function handleClickPrevButton() {
    props.onClick(props.currentPage - 1)
  }

  function handleClickLastPageButton() {
    props.onClick(props.lastPage)
  }

  function handleClickNextButton() {
    props.onClick(props.currentPage + 1)
  }

  const selectedPage = 'bg-white hover:bg-bg-hover-primary cursor-pointer'

  return (
    <div className={cn(`flex gap-2`, props.className)}>
      {prev && (
        <>
          <Avatar className={selectedPage} onClick={handleClickFirstPageButton}>
            <HiOutlineChevronDoubleLeft />
          </Avatar>
          <Avatar className={selectedPage} onClick={handleClickPrevButton}>
            <HiOutlineChevronLeft />
          </Avatar>
        </>
      )}
      {generatePageLinks().map((page, index) => {
        return (
          <Avatar
            key={index}
            className={cn(
              selectedPage,
              page === props.currentPage &&
                'bg-gradient-to-r from-sub-color to-main-color text-white',
            )}
            onClick={() => handleClick(page)}
          >
            <span>
              {props.symbol}
              {page}
            </span>
          </Avatar>
        )
      })}
      {next && (
        <>
          <Avatar className={selectedPage} onClick={handleClickNextButton}>
            <HiOutlineChevronRight />
          </Avatar>
          <Avatar className={selectedPage} onClick={handleClickLastPageButton}>
            <HiOutlineChevronDoubleRight />
          </Avatar>
        </>
      )}
    </div>
  )
}
