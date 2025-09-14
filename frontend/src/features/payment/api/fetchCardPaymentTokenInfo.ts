import type { CardPaymentTokenInfo } from '@/features/payment/types/CardPaymentTokenInfo'
import { Http } from '@/lib/api-client'

export default async function fetchCardPaymentTokenInfo(workspaceId: string) {
  const response = await Http.axios().get<{ data: CardPaymentTokenInfo }>(
    `/api/workspaces/${workspaceId}/payment/info`,
  )
  return response.data.data
}
