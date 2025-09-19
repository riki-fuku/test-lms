import { type FC } from 'react'
import fetchUsers from '@/features/users/api/fetchUsers'

type PageProps = {
  params: { tenantId: string }
}

const Page: FC<PageProps> = async ({ params }) => {
  const result = await fetchUsers(params.tenantId)
  const users = result?.data ?? []

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>ユーザー一覧</h1>
      {users.length > 0 ? (
        <div style={{ marginTop: 16, overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              maxWidth: 720,
              borderCollapse: 'collapse',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              background: 'white',
            }}
          >
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: 12, color: '#6b7280' }}>ユーザーID</th>
                <th style={{ padding: '12px 16px', fontSize: 12, color: '#6b7280' }}>名前</th>
                <th style={{ padding: '12px 16px', fontSize: 12, color: '#6b7280' }}>メールアドレス</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{user.id}</td>
                  <td style={{ padding: '12px 16px' }}>{user.name}</td>
                  <td style={{ padding: '12px 16px' }}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: 12 }}>ユーザーが存在しません。</p>
      )}
    </div>
  )
}

export default Page
