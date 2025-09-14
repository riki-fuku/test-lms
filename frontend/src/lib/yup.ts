import * as Yup from 'yup'

interface MessageParams {
  path: string
  label: string
  type: string
}

const labelText = (label?: string, suffix: string = 'は') => (label ? `${label}${suffix}` : '')

// 日本語のデフォルトメッセージ設定
// メッセージ関数の引数が有するプロパティについては`/frontend/node_modules/yup/index.d.ts`を参照のこと
const jpLocaleObject = {
  mixed: {
    default: ({ label }: MessageParams) => `${labelText(label, 'が')}無効です。`,
    required: ({ label }: MessageParams) => `${labelText(label)}入力必須です。`,
    notType: ({ label, originalValue }: MessageParams & { originalValue?: unknown }) =>
      originalValue === '' ? `${labelText(label)}入力必須です。` : `形式が無効です。`,
  },
  string: {
    length: ({ label, length }: MessageParams & { length: number }) =>
      `${labelText(label)}${length}文字で入力してください。`,
    matches: ({ label }: MessageParams) => `${labelText(label, 'の')}形式が不正です。`,
    min: ({ label, min }: MessageParams & { min: number }) =>
      `${labelText(label)}${min}文字以上で入力してください。`,
    max: ({ label, max }: MessageParams & { max: number }) =>
      `${labelText(label)}${max}文字以下で入力してください。`,
    email: 'メールアドレス形式で入力してください。',
  },
  number: {
    integer: ({ label }: MessageParams) => `${labelText(label)}整数で入力してください。`,
  },
}

Yup.setLocale(jpLocaleObject)

Yup.addMethod<Yup.StringSchema>(
  Yup.string,
  'equalTo',
  function (refField: string, refLabel: string, message?: string) {
    return this.test(
      'equalTo',
      message || `\${label}が${refLabel}と一致していません。`,
      function (value) {
        const { path, createError, options } = this

        // 検証対象のフィールドのラベルを取得
        const label = options.context?.labels?.[path] || path

        // 比較対象のフィールドの値を取得
        const refValue = this.resolve(Yup.ref(refField))

        return (
          value === refValue ||
          createError({
            path,
            message: message?.replace('${label}', label).replace('${refLabel}', ''),
          })
        )
      },
    )
  },
)

declare module 'yup' {
  interface StringSchema {
    equalTo(refField: string, refLabel: string, message?: string): this
  }
}

export default Yup
