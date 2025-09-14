'use client'

import Link from 'next/link'
import { FiAlertTriangle, FiHome } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      <div className='relative w-full max-w-lg px-6'>
        {/* 背景装飾 */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute -left-4 -top-4 size-72 animate-pulse rounded-full bg-blue-200 opacity-20 blur-3xl'></div>
          <div
            className='absolute -bottom-4 -right-4 size-72 animate-pulse rounded-full bg-indigo-200 opacity-20 blur-3xl'
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className='animate-fade-in relative rounded-2xl bg-white/80 p-8 text-center shadow-2xl backdrop-blur-sm'>
          {/* 404アイコン */}
          <div className='mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-orange-100'>
            <FiAlertTriangle className='size-12 text-red-500' />
          </div>

          {/* 404テキスト */}
          <h1 className='mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-8xl font-bold text-transparent'>
            404
          </h1>

          {/* タイトル */}
          <h2 className='mb-4 text-2xl font-bold text-gray-800'>ページが見つかりませんでした</h2>

          {/* 説明文 */}
          <p className='mb-8 leading-relaxed text-gray-600'>
            お探しのページは存在しないか、移動または削除された可能性があります。
            <br />
            正しいURLをご確認いただくか、以下のリンクからお進みください。
          </p>

          {/* アクションボタン */}
          <div className='space-y-4'>
            <Link
              href='/user/login'
              className='group relative inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-95'
            >
              <FiHome className='mr-2 size-5 transition-transform group-hover:scale-110' />
              ログインページへ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
