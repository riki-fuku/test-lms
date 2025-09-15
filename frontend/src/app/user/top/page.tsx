export default async function Page() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>TOPページ</h1>
      <p style={{ marginTop: 12 }}>
        このページは非テナント用です。テナント付きURLからアクセスしてください。
      </p>
    </div>
  )
}
