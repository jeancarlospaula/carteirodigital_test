require('dotenv').config()
const { Telegraf } = require('telegraf')
const connectDB = require('./src/database/connection/connectDB.js')
const BotController = require('./src/controllers/Bot.controller')

const bot = new Telegraf(process.env.BOT_TOKEN)

const start = async () => {
  await connectDB()

  bot.start(async (ctx) => BotController.start(ctx))
  bot.on('message', async (ctx) => BotController.message(ctx))
  bot.launch()
}

start()
