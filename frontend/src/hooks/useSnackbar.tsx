'use client'

import { Alert, Snackbar } from '@mui/material'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type SnackbarContextType = {
  showSnackbar: (message: string, severity: 'error' | 'warning' | 'info' | 'success') => void
  showSuccess: (message: string) => void
  showWarning: (message: string) => void
  showError: (message: string) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  showSuccess: () => {},
  showWarning: () => {},
  showError: () => {},
})

type SnackbarProviderProps = {
  children: React.ReactNode
}

export function SnackbarProvider(props: SnackbarProviderProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success')

  const autoHideDuration = 5000
  const anchorOrigin = {
    vertical: 'top' as 'top' | 'bottom',
    horizontal: 'right' as 'right' | 'left' | 'center',
  }

  const handleClose = () => {
    setOpen(false)
  }

  const showSnackbar = useCallback(
    (message: string, severity: 'error' | 'warning' | 'info' | 'success') => {
      setMessage(message)
      setSeverity(severity)
      setOpen(true)
    },
    [],
  )

  const showSuccess = useCallback(
    (message: string) => {
      showSnackbar(message, 'success')
    },
    [showSnackbar],
  )

  const showWarning = useCallback(
    (message: string) => {
      showSnackbar(message, 'warning')
    },
    [showSnackbar],
  )

  const showError = useCallback(
    (message: string) => {
      showSnackbar(message, 'error')
    },
    [showSnackbar],
  )

  const SnackBar = () => {
    return (
      <Snackbar
        style={{ zIndex: 999999 }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={handleClose} severity={severity} variant='filled'>
          {message}
        </Alert>
      </Snackbar>
    )
  }

  const value = useMemo(
    () => ({
      showSnackbar,
      showSuccess,
      showWarning,
      showError,
    }),
    [showSnackbar, showSuccess, showWarning, showError],
  )

  return (
    <SnackbarContext.Provider value={value}>
      <>
        <SnackBar />
        {props.children}
      </>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  return useContext(SnackbarContext)
}
