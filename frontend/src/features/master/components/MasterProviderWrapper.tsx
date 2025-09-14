import { fetchMasters } from '@/features/master/api'
import MasterProvider from '@/features/master/providers/MasterProvider'

/**
 * Server ComponentとしてMasterProviderをラップし、
 * サーバーサイドでマスターデータをフェッチする
 */
export default async function MasterProviderWrapper({ children }: { children: React.ReactNode }) {
  // サーバーサイドでマスターデータをフェッチ
  const { data: initialMasters } = await fetchMasters()

  return <MasterProvider initialMasters={initialMasters}>{children}</MasterProvider>
}
