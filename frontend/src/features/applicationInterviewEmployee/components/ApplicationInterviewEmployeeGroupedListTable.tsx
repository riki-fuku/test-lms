'use client'

import type { ApplicationInterviewEmployeeByApplication } from '@/features/applicationInterviewEmployee/api'
import { ApplicationInterviewEmployeeToggleActiveModalButton } from '@/features/applicationInterviewEmployee/components'
import type { APPLICATION_TYPE } from '@/features/applications/constants'
import type { TableProps } from '@heroui/react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'

type Props = TableProps & {
  workspaceId: string
  applicationTypeId: APPLICATION_TYPE
  applicationInterviewEmployees: ApplicationInterviewEmployeeByApplication[]
  onEnableSuccess?: () => void
  onDisableSuccess?: () => void
}

export function ApplicationInterviewEmployeeGroupedListTable({
  workspaceId,
  applicationTypeId,
  applicationInterviewEmployees,
  onEnableSuccess,
  onDisableSuccess,
  ...props
}: Props) {
  return (
    <Table aria-label='各種申請面談担当者一覧' {...props}>
      <TableHeader>
        <TableColumn>氏名</TableColumn>
        <TableColumn>有効化</TableColumn>
        <TableColumn>有効化切り替え</TableColumn>
      </TableHeader>
      <TableBody emptyContent='申請担当者が見つかりませんでした'>
        {applicationInterviewEmployees.map((applicationInterviewEmployee) => (
          <TableRow key={applicationInterviewEmployee.employee.id}>
            <TableCell>{applicationInterviewEmployee.employee.fullName}</TableCell>
            <TableCell>
              {applicationInterviewEmployee.enabled ? (
                <span className='text-text-green-primary'>オン</span>
              ) : (
                <span className='text-text-red-primary'>オフ</span>
              )}
            </TableCell>

            <TableCell>
              <ApplicationInterviewEmployeeToggleActiveModalButton
                workspaceId={workspaceId}
                applicationTypeId={applicationTypeId}
                applicationInterviewEmployee={applicationInterviewEmployee}
                size='sm'
                color='primary'
                onEnableSuccess={onEnableSuccess}
                onDisableSuccess={onDisableSuccess}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
