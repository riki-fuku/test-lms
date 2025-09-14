'use client'

import type { AutocompleteProps } from '@/components/kit/elements'
import { Autocomplete } from '@/components/kit/elements'
import useFetchUsers from '@/features/user/hooks/useFetchUsers'
import { useInfiniteScroll } from '@heroui/use-infinite-scroll'
import { useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type Props = Omit<AutocompleteProps, 'items'> & {
  workspaceId: string
}

type AutocompleteUserItem = {
  label: string
  key: string
}

export function AutocompleteUsers({ workspaceId, ...props }: Props) {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<AutocompleteUserItem[]>([])
  const [keyword, setKeyword] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useFetchUsers({
    pathParams: { workspaceId },
    queryParams: {
      keyword,
      page,
    },
  })

  const { data: usersData, meta } = useMemo(
    () => data ?? { data: [], meta: { lastPage: 1 } },
    [data],
  )

  // keywordが変わったらpageとusersをリセット
  useEffect(() => {
    setPage(1)
    setHasMore(true)
  }, [keyword])

  useEffect(() => {
    if (!usersData) return

    meta.lastPage === page ? setHasMore(false) : setHasMore(true)

    const formattedUsersData = usersData.map((user) => ({
      label: user.name,
      key: user.id,
    }))

    setUsers((prev) => {
      // 重複を防ぐために、既存のユーザーIDをチェック
      const existingIds = new Set(prev.map((user) => user.key))
      const newUsers = formattedUsersData.filter((user) => !existingIds.has(user.key))
      return [...prev, ...newUsers]
    })
  }, [usersData, page, meta.lastPage])

  const onLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1)
  }

  const onChange = useDebouncedCallback((value: string) => {
    setKeyword(value)
  }, 1000)

  const [_, scrollRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    onLoadMore,
    shouldUseLoader: false,
  })

  return (
    <Autocomplete
      {...props}
      items={users ?? []}
      onOpenChange={setIsOpen}
      scrollRef={scrollRef}
      isLoading={isLoading}
      onInputChange={onChange}
    />
  )
}
