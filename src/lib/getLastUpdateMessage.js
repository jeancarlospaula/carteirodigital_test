const { orderDeliveredMessage, lastUpdateMessage } = require('./../templates/messages')

const getLastUpdateMessage = ({ lastEvent, trackingCode }) => {
  const event = {
    code: trackingCode,
    status: lastEvent.descricao,
    cityOrigin: lastEvent.unidade?.endereco?.cidade,
    stateOrigin: lastEvent.unidade?.endereco?.uf,
    typeOrigin: lastEvent.unidade?.tipo,
    cityDestiny: lastEvent.unidadeDestino?.endereco.cidade,
    stateDestiny: lastEvent.unidadeDestino?.endereco.uf,
    typeDestiny: lastEvent.unidadeDestino?.tipo,
    dateUpdate: lastEvent.dtHrCriado
  }

  if (event.cityDestiny && event.stateDestiny) {
    return lastUpdateMessage(event)
  }

  return orderDeliveredMessage(event)
}

module.exports = {
  getLastUpdateMessage
}
