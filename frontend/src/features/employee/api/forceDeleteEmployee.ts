import { Http } from '@/lib/api-client'

type ForceDeleteEmployeeBody = {
  email: string
}

export default async function forceDeleteEmployee(body: ForceDeleteEmployeeBody) {
  return Http.axios().delete(`/api/employee/force-delete`, {
    params: body,
  })
}
