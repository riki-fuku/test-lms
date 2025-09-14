export type ExtensionApplication = {
  id: number
  userId: string
  extensionPlanId: string
  status: number
  email: string | null
  additionalInfo: string | null
  termsAcceptedAt: string
  paymentCompletedAt: string
  createdAt: string
  updatedAt: string
}
