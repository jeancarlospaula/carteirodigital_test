const welcomeMessage = (firstName) =>
`Bem-vindo(a) ${firstName}, eu sou o *Carteiro Digital* 📦 e levarei até você todas as informações sobre a sua encomenda.`

const firstCodeMessage = (firstName) =>
`Ah ${firstName}, para rastrear sua encomenda é só digital o código dela, ok? Lembre-se de digital um código *válido para os correios do Brasil*.`

const invalidCodeMessage = (code) =>
`O código *${code}* não parece ser válido ☹️\n
Vamos tentar rastrear sua encomenda novamente? Lembre-se de digital um código *válido para os correios do Brasil*.`

const lastUpdateMessage = ({
  code,
  status,
  cityOrigin,
  stateOrigin,
  typeOrigin,
  cityDestiny,
  stateDestiny,
  typeDestiny,
  dateUpdate
}) => `
*CÓDIGO*: ${code}\n\n
*STATUS*: ${status}\n\n
*ORIGEM*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()} (${typeOrigin})\n\n
*DESTINO*: ${cityDestiny.toUpperCase()} - ${stateDestiny.toUpperCase()} (${typeDestiny})\n\n
*DATA DA ATUALIZAÇÃO*: ${dateUpdate}\n\n
*Estou trabalhando e em breve quero poder te avisar sempre que a sua encomenda se movimentar* 😃`

const orderDeliveredMessage = ({
  code,
  status,
  cityOrigin,
  stateOrigin,
  dateUpdate
}) => `
*CÓDIGO*: ${code}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${dateUpdate}\n\n
*Toc toc, sua encomenda chegou! 📦*`

const errorMessage = 'No momento estou tirando uma folga 😴. Pode tentar me enviar o código de ratreamento da sua encomenda mais tarde? '

module.exports = {
  welcomeMessage,
  firstCodeMessage,
  invalidCodeMessage,
  lastUpdateMessage,
  orderDeliveredMessage,
  errorMessage
}
