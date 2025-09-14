import fetchMe from '@/features/auth/api/fetchMe'

export default async function Page() {
  const me = await fetchMe()
  const user = me?.data

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>TOPページ</h1>
      {user ? (
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gap: 8,
            maxWidth: 480,
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 16,
            background: 'white',
          }}
        >
          <div>
            <span style={{ color: '#6b7280', fontSize: 12 }}>ユーザーID</span>
            <div style={{ fontWeight: 600 }}>{user.id}</div>
          </div>
          <div>
            <span style={{ color: '#6b7280', fontSize: 12 }}>名前</span>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
          </div>
          <div>
            <span style={{ color: '#6b7280', fontSize: 12 }}>メールアドレス</span>
            <div style={{ fontWeight: 600 }}>{user.email}</div>
          </div>
        </div>
      ) : (
        <p style={{ marginTop: 12 }}>ユーザー情報が取得できませんでした。</p>
      )}
    </div>
  )
}
