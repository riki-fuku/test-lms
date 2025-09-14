import type { Category } from '@/features/help/types/Category'
import { Http } from '@/lib/api-client'

export default function fetchHelpCategory(workspaceId: string, categoryId: string) {
  return Http.axios()
    .get<{ data: Category }>(`/api/workspaces/${workspaceId}/guide/categories/${categoryId}`)
    .then((res) => res.data.data)
}
