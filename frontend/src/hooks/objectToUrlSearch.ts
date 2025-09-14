export const objectToUrlSearch = (object: object) => {
  const searchParams = new URLSearchParams()
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(`${key}`, String(v)))
    } else {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}
