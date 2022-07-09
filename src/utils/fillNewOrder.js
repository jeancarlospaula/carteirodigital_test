const fillNewOrder = async ({ userId, events, trackingCode }) => {
  const orderEvents = events.map(event => ({
    status: event.descricao,
    dateUpdate: event.dtHrCriado,
    location: {
      city: event.unidade.endereco.cidade,
      state: event.unidade.endereco.uf,
      type: event.unidade.tipo
    },
    destination: {
      city: event.unidadeDestino ? event.unidadeDestino.endereco.cidade : null,
      state: event.unidadeDestino ? event.unidadeDestino.endereco.uf : null,
      type: event.unidadeDestino ? event.unidadeDestino.tipo : null
    }
  }))

  const isOrderDelivered = !(orderEvents[0].destination.city && orderEvents[0].destination.state) && orderEvents[0].status.includes('Objeto entregue ao destinatário')

  const newOrder = {
    trackingCode,
    user: userId,
    events: orderEvents,
    notificationSent: true,
    delivered: isOrderDelivered
  }

  return newOrder
}

module.exports = fillNewOrder
