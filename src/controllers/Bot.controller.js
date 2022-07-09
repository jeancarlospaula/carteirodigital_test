const {
  welcomeMessage,
  firstCodeMessage,
  invalidCodeMessage,
  errorMessage
} = require('../../src/templates/messages')
const { tracking } = require('../services/correios/tracking')
const { getLastUpdateMessage } = require('../lib/getLastUpdateMessage')
const { checkInvalidCode } = require('../utils/checkInvalidCode')
const fillNewOrder = require('../utils/fillNewOrder')
const UserRepository = require('../../src/repositories/user.repository')
const OrderRepository = require('../repositories/order.repository')

class BotController {
  static async start (ctx) {
    try {
      const chat = ctx.update.message.chat

      const user = {
        chatId: chat.id,
        firstName: chat.first_name,
        username: chat.username
      }

      const userExists = await UserRepository.findOne({ chatId: chat.id })

      if (!userExists) {
        await UserRepository.insert(user)
      }

      await ctx.replyWithMarkdown(welcomeMessage(chat.first_name))
      await ctx.replyWithMarkdown(firstCodeMessage(chat.first_name))
    } catch (error) {
      console.log(error)
      return ctx.replyWithMarkdown('No momento estou tirando uma folga. Pode tentar me enviar o código de ratreamento da sua encomenda mais tarde?')
    }
  }

  static async message (ctx) {
    const trackingCode = ctx.update.message.text
    try {
      const chat = ctx.update.message.chat

      const regex = /\W|_/
      const trackingData = !regex.test(trackingCode) ? await tracking(trackingCode) : null

      const invalidTrackingCode = Array.isArray(trackingData) ? checkInvalidCode(trackingData[0].mensagem) : true
      if (invalidTrackingCode) {
        return ctx.replyWithMarkdown(invalidCodeMessage(trackingCode))
      }

      const trackingEvents = trackingData[0].eventos
      const { _id: userId } = await UserRepository.findOne({ chatId: chat.id })
      const newOrder = await fillNewOrder({ userId, events: trackingEvents, trackingCode })

      const order = await OrderRepository.findOne({ trackingCode, user: userId })
      if (order) {
        await OrderRepository.findByIdAndUpdate(order._id, newOrder)
      } else {
        await OrderRepository.insert(newOrder)
      }

      const message = getLastUpdateMessage({ lastEvent: trackingEvents[0], trackingCode })
      ctx.replyWithMarkdown(message)
    } catch (error) {
      console.log(`Tracking code: ${trackingCode} -`, error)
      return ctx.replyWithMarkdown(errorMessage)
    }
  }
}

module.exports = BotController
