'use client'
import Tab, { TabItem } from '@/components/ui/Tab'
import EmployeeProfile from '@/features/employee/components/EmployeeProfile'
import NotificationSettingsSection from '@/features/settings/components/NotificationSettingsSection'
import { useEmployeeStore } from '@/store/employee-store'

export const EmployeeSettingsSection = () => {
  const { employee } = useEmployeeStore.getState()
  const workspaceId = employee?.activeWorkspace?.workspaceId ?? ''
  const actorId = employee?.id ?? ''

  return (
    <>
      <Tab defaultActiveKey='1'>
        <TabItem label='プロフィール設定' tabKey='1'>
          <EmployeeProfile />
        </TabItem>
        <TabItem label='通知設定' tabKey='2'>
          <NotificationSettingsSection
            actorId={actorId}
            actorType='employee'
            lineRedirectPath={`/renewal/employee/${workspaceId}/settings/notification`}
          />
        </TabItem>
      </Tab>
    </>
  )
}
