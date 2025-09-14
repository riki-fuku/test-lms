import { ACCOUNT_TYPE, EMPLOYEE_ROLE } from '@/constants'
import type { Employee } from '@/features/employee/types'
import type { UserMe } from '@/features/user/types'
import { useActorStore } from '@/store/actor-store'
import { useRouter } from 'next/navigation'

export default function useGoTopPage() {
  const router = useRouter()
  const actor = useActorStore((state) => state.actor)
  const actorType = useActorStore((state) => state.actorType)

  const goTopPage = () => {
    if (actorType === ACCOUNT_TYPE.USER) {
      goTopPageByUser(actor as UserMe)
    } else if (actorType === ACCOUNT_TYPE.EMPLOYEE) {
      goTopPageByEmployee(actor as Employee)
    } else {
      return router.push('/renewal/user/login')
    }
  }

  const goTopPageByUser = (actor: UserMe) => {
    const workspaceId = actor.activeWorkspace.workspaceId
    const path = `/renewal/user/${workspaceId}/dashboard`

    router.push(path)
  }

  const goTopPageByEmployee = (actor: Employee) => {
    const workspaceId = actor.activeWorkspace.workspaceId
    let path = `/renewal/employee/${workspaceId}/meetings`
    if (actor.role === EMPLOYEE_ROLE.CS) {
      path = `/renewal/employee/${workspaceId}/cs/users/`
    } else if (actor.role === EMPLOYEE_ROLE.ADMIN) {
      path = `/renewal/employee/${workspaceId}/admin/chat`
    }
    router.push(path)
  }

  return { goTopPage, goTopPageByUser }
}
