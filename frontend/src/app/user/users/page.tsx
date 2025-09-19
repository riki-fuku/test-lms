import type { CSSProperties, ReactNode } from 'react'

import Link from 'next/link'

import { fetchUsers } from '@/features/user/api/fetchUsers'
import type { User } from '@/features/user/types/User'

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

type PageSearchParams = Record<string, string | string[] | undefined>

type PageProps = {
  searchParams?: PageSearchParams
}

export default async function Page({ searchParams }: PageProps) {
  const currentPage = getCurrentPage(searchParams)
  const { data: users, meta } = await fetchUsers({
    queryParams: { page: currentPage },
  })

  const previousPage = meta.currentPage > 1 ? meta.currentPage - 1 : null
  const nextPage = meta.currentPage < meta.lastPage ? meta.currentPage + 1 : null

  const containerStyle: CSSProperties = {
    display: 'grid',
    gap: 24,
    padding: 24,
  }

  return (
    <div style={containerStyle}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>ユーザー一覧</h1>
          <p style={{ marginTop: 8, marginBottom: 0, color: '#6b7280' }}>全{meta.total}件のユーザー</p>
        </div>
        <span style={{ color: '#6b7280', fontSize: 14 }}>
          {meta.currentPage} / {meta.lastPage} ページ
        </span>
      </header>

      <section style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>名前</TableHeader>
              <TableHeader>メールアドレス</TableHeader>
              <TableHeader>作成日時</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>
                  表示できるユーザーが見つかりませんでした。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <nav style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
        {previousPage ? (
          <PaginationLink href={buildPageHref(previousPage, searchParams)}>前のページ</PaginationLink>
        ) : (
          <PaginationDisabled>前のページ</PaginationDisabled>
        )}

        <span style={{ color: '#6b7280', fontSize: 14 }}>
          {meta.from ?? 0} - {meta.to ?? 0} / {meta.total}
        </span>

        {nextPage ? (
          <PaginationLink href={buildPageHref(nextPage, searchParams)}>次のページ</PaginationLink>
        ) : (
          <PaginationDisabled>次のページ</PaginationDisabled>
        )}
      </nav>
    </div>
  )
}

function getCurrentPage(searchParams?: PageSearchParams) {
  const raw = searchParams?.page
  const pageParam = Array.isArray(raw) ? raw[0] : raw
  const parsed = Number.parseInt(pageParam ?? '1', 10)

  if (Number.isNaN(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

function formatDate(value: User['createdAt']) {
  if (!value) {
    return '-'
  }

  try {
    return DATE_TIME_FORMATTER.format(new Date(value))
  } catch (error) {
    return value
  }
}

function buildPageHref(targetPage: number, searchParams?: PageSearchParams) {
  const params = new URLSearchParams()

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (key === 'page') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        params.append(key, entry)
      })
      return
    }

    if (value !== undefined) {
      params.set(key, value)
    }
  })

  if (targetPage > 1) {
    params.set('page', String(targetPage))
  }

  const query = params.toString()

  return query ? `?${query}` : ''
}

function TableHeader({ children }: { children: ReactNode }) {
  return (
    <th
      style={{
        padding: '14px 16px',
        textAlign: 'left',
        fontSize: 12,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: '#6b7280',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {children}
    </th>
  )
}

function TableCell({ children }: { children: ReactNode }) {
  return (
    <td style={{ padding: '14px 16px', fontSize: 14, color: '#111827' }}>
      {children}
    </td>
  )
}

function PaginationLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 16px',
        borderRadius: 9999,
        border: '1px solid #d1d5db',
        color: '#2563eb',
        background: 'white',
        fontWeight: 600,
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  )
}

function PaginationDisabled({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        padding: '8px 16px',
        borderRadius: 9999,
        border: '1px solid #e5e7eb',
        color: '#9ca3af',
        background: '#f3f4f6',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}
