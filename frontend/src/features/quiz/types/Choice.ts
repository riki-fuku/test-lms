export type ChoiceType = 'DEFAULT' | 'CORRECT' | 'INCORRECT'

export type Choice = {
  prefix: string
  text: string
  type: ChoiceType
  value: boolean
}
