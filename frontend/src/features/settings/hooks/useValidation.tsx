export default function useValidation() {
  function validateHasCurrentEmail(currentEmail: string) {
    return !!currentEmail
  }

  function validateHasConfirmEmail(verifiedCurrentEmail: string) {
    return !!verifiedCurrentEmail
  }

  return {
    validateHasCurrentEmail,
    validateHasConfirmEmail,
  }
}
