import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type MeResponse = {
  data: {
    id: number
    name: string
    email: string
  } | null
}

type MeHttpDocument = HttpDocument<undefined, undefined, undefined, MeResponse>

export default function fetchMe(
  params?: MeHttpDocument['params'],
  options?: MeHttpDocument['options'],
) {
  return http<MeHttpDocument>('/api/user/me', 'GET', params, options)
}

