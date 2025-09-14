export default function useValidation() {
  function validateHasLastName(lastName: string) {
    return lastName ? true : false
  }

  function validateHasFirstName(firstName: string) {
    return firstName ? true : false
  }

  function validateHasNickName(nickName: string) {
    return nickName ? true : false
  }

  function validateIsNickNameInRange(nickName: string) {
    return nickName.length <= 10 ? true : false
  }

  function validateHasBirthday(birthday: Date | string | null | undefined) {
    if (birthday === 'Invalid Date') {
      return false
    }
    return birthday ? true : false
  }

  function validateHasSelfIntroduction(selfIntroduction: string) {
    return selfIntroduction ? true : false
  }

  function handleValidateLastName(value: string | undefined) {
    return Boolean(value)
  }

  function handleValidateFirstName(value: string | undefined) {
    return Boolean(value)
  }

  function handleValidateNickName(value: string | undefined) {
    return value && value.length <= 10 ? true : false
  }

  function handleValidateIsNickNameInRange(value: string | undefined) {
    return value && value.length <= 10 ? true : false
  }

  function handleValidateBirthday(value: string | null | undefined) {
    if (value === 'Invalid Date') {
      return false
    }

    return Boolean(value)
  }

  function handleValidateMeetingDate(value: string | null | undefined) {
    return Boolean(value)
  }

  function handleValidateSelfIntroduction(value: string | null | undefined) {
    return Boolean(value)
  }

  return {
    validateHasLastName,
    validateHasFirstName,
    validateHasNickName,
    validateIsNickNameInRange,
    validateHasBirthday,
    validateHasSelfIntroduction,
    handleValidateLastName,
    handleValidateFirstName,
    handleValidateNickName,
    handleValidateIsNickNameInRange,
    handleValidateBirthday,
    handleValidateMeetingDate,
    handleValidateSelfIntroduction,
  }
}
