'use client'

import { APPLICATION_STATUS } from '@/features/applications/constants'
import type { CancellationApplication } from '@/features/cancellationApplication/types'
import dayjs from '@/lib/dayjs'
import type { TableProps } from '@heroui/react'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'

type Props = TableProps & {
  cancellationApplications: Pick<
    CancellationApplication,
    'id' | 'user' | 'status' | 'resultStatus' | 'employee' | 'latestApplicationInterview'
  >[]
  isLoading?: boolean
  onRowClick?: (CancellationApplicationId: string) => void
}

export function CancellationApplicationListTable({
  cancellationApplications,
  isLoading = false,
  onRowClick,
  ...props
}: Props) {
  return (
    <Table aria-label='申請一覧' {...props}>
      <TableHeader>
        <TableColumn>氏名</TableColumn>
        <TableColumn>mail</TableColumn>
        <TableColumn>面談日</TableColumn>
        <TableColumn>面談担当者</TableColumn>
        <TableColumn>対応状況</TableColumn>
        <TableColumn>申請結果</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent='ユーザーが見つかりませんでした'
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {cancellationApplications.map((cancellationApplication) => {
          const { id, user, employee, latestApplicationInterview, status, resultStatus } =
            cancellationApplication
          return (
            <TableRow
              className='cursor-pointer hover:bg-gray-100'
              key={id}
              onClick={() => onRowClick?.(id)}
            >
              <TableCell className='whitespace-nowrap'>{user.fullName}</TableCell>
              <TableCell className='whitespace-nowrap'>{user.email}</TableCell>
              <TableCell className='whitespace-nowrap'>
                {latestApplicationInterview?.interviewDatetime
                  ? dayjs(latestApplicationInterview.interviewDatetime).format('YYYY/MM/DD')
                  : '-'}
              </TableCell>
              <TableCell className='whitespace-nowrap'>{employee.fullName}</TableCell>
              <TableCell className='whitespace-nowrap'>{status?.label ?? '-'}</TableCell>
              <TableCell className='whitespace-nowrap'>
                {status.value === APPLICATION_STATUS.COMPLETED ? resultStatus?.label : '-'}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
