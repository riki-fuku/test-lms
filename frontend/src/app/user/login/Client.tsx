"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import login from '@/features/auth/api/login'

export default function Client() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({
        requestBody: { type: 'user', email, password },
      })
      router.push('/user/top')
    } catch (err) {
      setError('メールアドレスまたはパスワードが正しくありません')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          display: 'grid',
          gap: 12,
          padding: 24,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          background: 'white',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>ログイン</h1>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>メールアドレス</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.com"
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
            }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
            }}
          />
        </label>
        {error && (
          <div style={{ color: '#b91c1c', fontSize: 12 }} role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid transparent',
            background: loading ? '#9ca3af' : '#2563eb',
            color: 'white',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
    </div>
  )
}

