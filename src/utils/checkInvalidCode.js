const checkInvalidCode = (message) => {
  if (message && message.includes('Objeto inválido')) return true
  return false
}

module.exports = { checkInvalidCode }
