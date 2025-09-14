import { useCallback, useState } from 'react'

/**
 * @param action 実行したい関数を受け取る（同期・非同期問わず）
 * @returns [実行関数, ローディング状態]
 */
export function useAsyncSafeAction<Args extends unknown[]>(
  action: (...args: Args) => void,
): [
  (...args: Args) => Promise<void>, // 非同期含めた多重実行防止のラップ関数
  boolean, // ローディング状態
] {
  const [isLoading, setIsLoading] = useState(false)

  const wrappedAction = useCallback(
    async (...args: Args) => {
      if (isLoading) return // ローディング中の多重実行を防止

      setIsLoading(true)

      try {
        // 同期・非同期どちらでも Promise.resolve でラップすれば統一的に await 可能
        await Promise.resolve(action(...args))
      } finally {
        setIsLoading(false)
      }
    },
    [action, isLoading],
  )

  return [wrappedAction, isLoading]
}
