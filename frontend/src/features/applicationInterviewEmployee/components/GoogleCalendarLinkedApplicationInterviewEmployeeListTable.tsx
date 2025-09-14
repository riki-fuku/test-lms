'use client'

import type { ApplicationInterviewEmployeeByApplication } from '@/features/applicationInterviewEmployee/api'
import { APPLICATION_TYPE } from '@/features/applications/constants'
import { useMasterContext } from '@/features/master/providers'
import { useActorStore } from '@/store/actor-store'
import type { TableProps } from '@heroui/react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'

type Props = TableProps & {
  cancellationApplicationInterviewEmployees: ApplicationInterviewEmployeeByApplication[]
  suspendApplicationInterviewEmployees: ApplicationInterviewEmployeeByApplication[]
  coachChangeApplicationInterviewEmployees: ApplicationInterviewEmployeeByApplication[]
  onRowClick?: (applicationTypeId: APPLICATION_TYPE) => void
}

export function GoogleCalendarLinkedApplicationInterviewEmployeeListTable({
  cancellationApplicationInterviewEmployees,
  suspendApplicationInterviewEmployees,
  coachChangeApplicationInterviewEmployees,
  onRowClick,
  ...props
}: Props) {
  const {
    masters: { application_types },
  } = useMasterContext()

  const currentUser = useActorStore((state) => state.actor)
  const currentUserId = currentUser?.id ?? null

  const getTypeLabel = (value: APPLICATION_TYPE) =>
    application_types.find((t) => t.value === value)?.label ?? ''

  const renderEmployees = (employees: ApplicationInterviewEmployeeByApplication[]) => {
    if (employees.length === 0) {
      return <div className='text-gray-500'>担当者が設定されていません</div>
    }

    const sorted = [...employees].sort((a, b) => {
      const aIsCurrent = a.employee.id === currentUserId
      const bIsCurrent = b.employee.id === currentUserId
      // 現在のユーザーを最優先にする
      if (aIsCurrent && !bIsCurrent) return -1
      if (!aIsCurrent && bIsCurrent) return 1
      return 0
    })

    return sorted.map((employee, index) => (
      <span key={employee.employee.id}>
        <span className={employee.employee.id === currentUserId ? 'font-bold' : ''}>
          {employee.employee.fullName}
        </span>
        {index < sorted.length - 1 && ', '}
      </span>
    ))
  }

  const rows = [
    {
      type: APPLICATION_TYPE.CANCELLATION_APPLICATION,
      employees: cancellationApplicationInterviewEmployees,
    },
    {
      type: APPLICATION_TYPE.SUSPEND_APPLICATION,
      employees: suspendApplicationInterviewEmployees,
    },
    {
      type: APPLICATION_TYPE.COACH_CHANGE_APPLICATION,
      employees: coachChangeApplicationInterviewEmployees,
    },
  ]

  return (
    <Table aria-label='各種申請面談担当者一覧' {...props}>
      <TableHeader>
        <TableColumn className='w-[10%] min-w-[40px]'>申請種別</TableColumn>
        <TableColumn>カレンダー連携アカウント</TableColumn>
      </TableHeader>

      <TableBody emptyContent='申請担当者が見つかりませんでした'>
        {rows.map(({ type, employees }) => (
          <TableRow key={type} onClick={() => onRowClick?.(type)}>
            <TableCell className='whitespace-nowrap'>{getTypeLabel(type)}</TableCell>
            <TableCell className='whitespace-nowrap'>{renderEmployees(employees)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
