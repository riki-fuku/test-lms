"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Client() {
  const router = useRouter()
  const [tenantId, setTenantId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tenantId) return
    router.push(`/t/${encodeURIComponent(tenantId)}/user/top`)
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
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>テナントを選択</h1>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>テナントID</span>
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
            placeholder="例: tenant_123"
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid transparent',
            background: '#2563eb',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ログイン画面へ
        </button>
      </form>
    </div>
  )
}
