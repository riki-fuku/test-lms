'use client'

import { Button, Input, Pagination } from '@/components/kit'
import { UserListTable } from '@/features/user/components'
import type { User } from '@/features/user/types'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Key } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { HiSearch } from 'react-icons/hi'
import * as yup from 'yup'

type Props = {
  users: User[]
  query: {
    page: number
    keyword: string
  }
  meta: {
    lastPage: number
  }
  redirectPath?: string
  onSearch?: (params: URLSearchParams) => void
  onRowAction?: (user: Key) => void
}

const schema = yup.object({
  page: yup.number().defined(),
  keyword: yup.string().defined(),
})

type FormValues = yup.InferType<typeof schema>

export function UserListTablePagination({ users, query, meta, onSearch, onRowAction }: Props) {
  const { watch, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      page: query.page,
      keyword: query.keyword,
    },
  })

  const search = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: watch('page').toString(),
      keyword: watch('keyword'),
    })
    onSearch?.(queryParams)
  }, [watch, onSearch])

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-2'>
        <Input
          placeholder='氏名、メールアドレスを入力して検索'
          className='w-full'
          type='search'
          startContent={<HiSearch />}
          value={watch('keyword')}
          onChange={(e) => {
            setValue('keyword', e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setValue('page', 1)
              search()
            }
          }}
        />
        <Button
          onPress={() => {
            setValue('keyword', '')
            setValue('page', 1)
            search()
          }}
        >
          リセット
        </Button>
      </div>

      <UserListTable
        users={users}
        selectionMode='single'
        onRowAction={onRowAction}
        classNames={{
          tr: 'cursor-pointer',
        }}
      />

      <div className='flex justify-center'>
        <Pagination
          total={meta.lastPage}
          page={query.page}
          onChange={(value) => {
            setValue('page', value)
            search()
          }}
        />
      </div>
    </div>
  )
}
