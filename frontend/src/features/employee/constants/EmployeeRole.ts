export const EmployeeRole = {
  COACH: 'coach',
  ADMIN: 'admin',
  CS: 'cs',
} as const

export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole]
