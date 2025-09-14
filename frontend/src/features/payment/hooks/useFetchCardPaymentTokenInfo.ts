import fetchCardPaymentTokenInfo from '@/features/payment/api/fetchCardPaymentTokenInfo'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchCardPaymentTokenInfo(
  workspaceId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchCardPaymentTokenInfo(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/payment/info`, fetcher, swrOptions)
}
