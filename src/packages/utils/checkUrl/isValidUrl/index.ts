const isValidHttpUrl = (string) => {
  try {
    const url = new URL(string)

    return url
  } catch (_) {
    return false
  }
}

export default isValidHttpUrl
