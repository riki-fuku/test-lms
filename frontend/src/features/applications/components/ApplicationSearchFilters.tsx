'use client'

import { Button, Input } from '@/components/kit'
import { AutocompleteEmployees } from '@/features/employee/components'
import { EmployeeRole } from '@/features/employee/constants'
import { CheckGroupApplicationStatus } from '@/features/master/components'
import { CheckGroupApplicationResultStatus } from '@/features/master/components/CheckGroupApplicationResultStatus'
import { objectToUrlSearch } from '@/hooks/objectToUrlSearch'
import useDisclosure from '@/hooks/useDisclosure'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import * as yup from 'yup'

const schema = yup.object({
  keyword: yup.string().defined(),
  interviewer: yup.string().defined(),
  statusIds: yup.array().of(yup.string()).defined(),
  resultStatusIds: yup.array().of(yup.string()).defined(),
})

type FormValues = yup.InferType<typeof schema>

type Props = {
  workspaceId: string
  query: {
    tab: string
    keyword: string
    interviewer: string
    statusIds: string[]
    resultStatusIds: string[]
  }
}

export function ApplicationSearchFilters({ query, workspaceId }: Props) {
  const filter = useDisclosure()
  const router = useRouter()

  const { handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    reset({
      keyword: query.keyword || '',
      interviewer: query.interviewer || '',
      statusIds: query.statusIds,
      resultStatusIds: query.resultStatusIds,
    })
  }, [query, reset])

  const search = (data: FormValues) => {
    const queryParams = objectToUrlSearch({
      tab: query.tab,
      keyword: data.keyword,
      interviewer: data.interviewer,
      statusIds: data.statusIds,
      resultStatusIds: data.resultStatusIds,
    })

    router.push(`?${queryParams}`)
  }

  return (
    <>
      <form className='flex flex-col gap-5 bg-bg-secondary p-4' onSubmit={handleSubmit(search)}>
        <Input
          placeholder='検索'
          type='search'
          classNames={{ inputWrapper: 'bg-white' }}
          value={watch('keyword')}
          onChange={(e) => {
            setValue('keyword', e.target.value)
          }}
        />

        <div className='flex items-center justify-center'>
          <Button
            variant='light'
            size='sm'
            className='text-lg'
            endContent={filter.isOpen ? <HiChevronUp /> : <HiChevronDown />}
            onPress={filter.toggle}
          >
            絞り込み条件追加
          </Button>
        </div>

        {filter.isOpen && (
          <div className='flex flex-col gap-2'>
            <AutocompleteEmployees
              workspaceId={workspaceId}
              type={EmployeeRole.CS}
              selectedKey={watch('interviewer')}
              onSelectionChange={(key) => {
                setValue('interviewer', key as string)
              }}
              size='sm'
              label='面談対応者'
              placeholder='面談対応者を選択'
              labelPlacement='outside'
            />

            <CheckGroupApplicationStatus
              value={watch('statusIds').filter((status): status is string => status !== undefined)}
              onValueChange={(value) => {
                setValue('statusIds', value)
              }}
              label='対応状況'
              size='sm'
              orientation='horizontal'
            />

            <CheckGroupApplicationResultStatus
              value={watch('resultStatusIds').filter(
                (status): status is string => status !== undefined,
              )}
              onValueChange={(value) => {
                setValue('resultStatusIds', value)
              }}
              label='申請結果'
              size='sm'
              orientation='horizontal'
            />
          </div>
        )}

        <div className='flex justify-center gap-2'>
          <Button color='primary' type='submit'>
            検索
          </Button>
          <Button
            color='danger'
            variant='light'
            onPress={() => {
              router.push(`?tab=${query.tab}`)
              reset()
            }}
          >
            条件をクリア
          </Button>
        </div>
      </form>
    </>
  )
}
