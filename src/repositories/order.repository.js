const Order = require('../models/order.model')

class OrderRepository {
  static async insert ({
    trackingCode,
    user,
    events,
    notificationSent,
    delivered
  }) {
    const order = new Order({
      trackingCode,
      user,
      events,
      notificationSent,
      delivered
    })
    const newOrder = await order.save()
    return newOrder
  }

  static async findOne (conditions) {
    const order = await Order.findOne(conditions)
    return order
  }

  static async findByIdAndUpdate (id, conditions) {
    const order = await Order.findByIdAndUpdate(id, conditions)
    return order
  }
}

module.exports = OrderRepository
