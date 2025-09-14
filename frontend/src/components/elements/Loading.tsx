'use client'

import { useLoading } from '@/hooks/useLoading'
import { CircularProgress, Modal } from '@mui/material'

export default function Loading() {
  const { isLoading } = useLoading()

  return (
    <Modal open={isLoading}>
      <div className='flex h-screen w-screen items-center justify-center'>
        <CircularProgress />
      </div>
    </Modal>
  )
}
