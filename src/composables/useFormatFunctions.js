export function useFormatFunctions() {
  const formatAmount = (amount) => {
    const totalAmount = parseFloat(amount)
    if (Number.isInteger(totalAmount)) {
      return totalAmount.toFixed(0)
    } else {
      return totalAmount.toFixed(2)
    }
  }

  const formatDate = (originalDate) => {
    if (originalDate) {
      const date = new Date(originalDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    } else {
      return null
    }
  }

  const formatDateTime = (originalDate) => {
    if (originalDate) {
      const date = new Date(originalDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    } else {
      return null
    }
  }

  const formatToTitleCase = (text) => {
    if (text) {
      text = text.replace(/_/g, ' ').replace(/\s+/g, ' ')
      const words = text.split(' ')
      const titleCaseWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      const titleCaseString = titleCaseWords.join(' ')
      return titleCaseString
    }

    return
  }

  return {
    formatAmount,
    formatDate,
    formatDateTime,
    formatToTitleCase
  }
}
