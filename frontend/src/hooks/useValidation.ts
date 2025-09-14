export default function useValidation() {
  // 使用できる文字かどうかをチェックする関数

  /**
   * @param value
   * 使用できる文字
   * - 半角英数字・ハイフン・ピリオド・アンダースコア
   * - 先頭にハイフン、ピリオド、アンダースコアは使用できない
   */
  function checkCanUse(value: string): boolean {
    if (value.length === 0) {
      return true
    }

    const regex = /^(?![-._])[a-zA-Z0-9-._]+$/
    return regex.test(value)
  }

  // 半角英数字を含むかどうかをチェックする関数
  function checkRequiredChar(value: string): boolean {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9._-]+$/.test(value)
  }

  // 文字数の範囲内かどうかをチェックする関数
  function checkInRange(value: string): boolean {
    return value.length >= 6 && value.length <= 24
  }

  // 引数の文字と一致しているかどうかをチェックする関数
  function checkMatch(value: string, confirm: string): boolean {
    return value === confirm
  }

  function checkEmail(value: string): boolean {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  }

  // １桁目が0で、10桁以上11桁以下の数字かどうか（電話番号として最低限の整合性）をチェックする関数
  function checkPhoneNumber(value: string): boolean {
    return /^0[0-9]{9,10}$/.test(value)
  }

  return {
    checkCanUse,
    checkRequiredChar,
    checkInRange,
    checkMatch,
    checkEmail,
    checkPhoneNumber,
  }
}
