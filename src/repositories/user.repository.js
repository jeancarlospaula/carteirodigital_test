const User = require('../models/user.model')

class UserRepository {
  static async insert ({ chatId, firstName, username }) {
    const user = new User({
      chatId,
      firstName,
      username
    })
    const newUser = await user.save()
    return newUser
  }

  static async findOne ({ conditions }) {
    const user = await User.findOne(conditions)
    return user
  }
}

module.exports = UserRepository
