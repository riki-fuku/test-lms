import { LoadingProvider } from '@/hooks/useLoading'
import { SnackbarProvider } from '@/hooks/useSnackbar'
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Suspense, type FC, type ReactNode } from 'react'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense>
      <AppRouterCacheProvider>
        <HeroUIProvider locale='ja'>
          <ToastProvider />
          <SnackbarProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </SnackbarProvider>
        </HeroUIProvider>
      </AppRouterCacheProvider>
    </Suspense>
  )
}
