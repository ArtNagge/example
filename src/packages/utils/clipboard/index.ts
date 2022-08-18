const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')

    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

const readFromClipboard = async () => {
  if (navigator.clipboard) {
    const text = await navigator.clipboard.readText()

    return text
  }
  {
    const textArea = document.createElement('textarea')

    document.body.appendChild(textArea)
    textArea.focus()
    document.execCommand('paste')

    const { value } = textArea

    document.body.removeChild(textArea)

    return value
  }
}

export { copyToClipboard, readFromClipboard }
