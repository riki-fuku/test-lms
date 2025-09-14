import type { ExtensionPaymentRes } from '@/features/payment/types/ExtensionPayment'
import { Http } from '@/lib/api-client'

export type ExtensionPaymentReq = {
  amount: number
  order_id: string
  payment_token: string
}

export default function postExtensionPayment(workspaceId: string, body: ExtensionPaymentReq) {
  return Http.axios()
    .post<{ data: ExtensionPaymentRes }>(`/api/workspaces/${workspaceId}/payment/`, body)
    .then((res) => res.data.data)
}
