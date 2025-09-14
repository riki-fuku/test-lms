'use client'

import type { User } from '@/features/user/types'
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
  users: User[]
  isLoading?: boolean
}

export function UserListTable({ users, isLoading = false, ...props }: Props) {
  return (
    <Table aria-label='ユーザ一覧' {...props}>
      <TableHeader>
        <TableColumn>氏名</TableColumn>
        <TableColumn>メールアドレス</TableColumn>
        <TableColumn>コース</TableColumn>
        <TableColumn>受講開始日</TableColumn>
        <TableColumn>卒業日</TableColumn>
        <TableColumn className='text-right'>消化日数割合</TableColumn>
        <TableColumn className='text-right'>面談回数</TableColumn>
        <TableColumn className='text-right'>受講状態</TableColumn>
        <TableColumn className='text-right'>アクティブ状態</TableColumn>
        <TableColumn className='text-right'>PRO判定</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent='ユーザーが見つかりませんでした'
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='whitespace-nowrap'>{user.name}</TableCell>
            <TableCell className='whitespace-nowrap'>{user.email}</TableCell>
            <TableCell className='whitespace-nowrap'>{user.course}</TableCell>
            <TableCell className='whitespace-nowrap'>
              {user.startingDate ? dayjs(user.startingDate).format('YYYY/MM/DD') : '-'}
            </TableCell>
            <TableCell className='whitespace-nowrap'>
              {user.graduateDate ? dayjs(user.graduateDate).format('YYYY/MM/DD') : '未定'}
            </TableCell>
            <TableCell className='whitespace-nowrap text-right'>{user.courseProgress}%</TableCell>
            <TableCell className='whitespace-nowrap text-right'>{user.meetingCount}</TableCell>
            <TableCell className='whitespace-nowrap text-right'>{user.status.label}</TableCell>
            <TableCell className='whitespace-nowrap text-right'>
              {user.isRecentlyActive ? 'アクティブ' : '非アクティブ'}
            </TableCell>
            <TableCell className='whitespace-nowrap text-right'>
              {user.proCertification ? 'PRO' : '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
