'use client'

import { useFetchUserMatches } from '@/features/match/hooks'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export type MatchingHistory = {
  changedDate: string
  oldEmployee: string
  newEmployee: string
  reason: string
}

export function MatchingHistoryTable({
  workspaceId,
  userId,
}: {
  workspaceId: string
  userId: string
}) {
  const { data: { data: matches } = { data: undefined } } = useFetchUserMatches(workspaceId, userId)

  // コーチ変更履歴の作成
  const matchingHistory: MatchingHistory[] = matches?.length
    ? matches
        .map((match, index, arr) => {
          if (index === arr.length - 1) return null

          return {
            changedDate: format(new Date(match.changedAt), 'yyyy/MM/dd', { locale: ja }),
            oldEmployee: arr[index + 1].employee.name,
            newEmployee: match.employee.name,
            reason: match.reason,
          }
        })
        .filter((item): item is MatchingHistory => item !== null)
    : []

  return (
    <div className='rounded bg-white p-6'>
      <Table aria-label='コーチ変更履歴'>
        <TableHeader>
          <TableColumn className='text-center font-semibold'>コーチ変更日</TableColumn>
          <TableColumn className='text-center font-semibold'>変更前コーチ</TableColumn>
          <TableColumn className='text-center font-semibold'>変更後コーチ</TableColumn>
          <TableColumn className='text-left font-semibold'>コーチ変更理由</TableColumn>
        </TableHeader>
        <TableBody emptyContent='コーチ変更履歴がありません。'>
          {matchingHistory.map((row) => (
            <TableRow
              key={row.changedDate + row.oldEmployee + row.newEmployee}
              className='border-b'
            >
              <TableCell className='text-center'>{row.changedDate}</TableCell>
              <TableCell className='text-center'>{row.oldEmployee}</TableCell>
              <TableCell className='text-center'>{row.newEmployee}</TableCell>
              <TableCell className='text-left'>{row.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
