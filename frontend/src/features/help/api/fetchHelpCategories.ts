import type { Category } from '@/features/help/types/Category'
import { Http } from '@/lib/api-client'

export default function fetchHelpCategories(workspaceId: string) {
  return Http.axios()
    .get<{ data: Category[] }>(`/api/workspaces/${workspaceId}/guide/categories`)
    .then((res) => res.data.data)
}
