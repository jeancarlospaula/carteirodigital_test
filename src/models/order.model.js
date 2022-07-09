const { Schema, model: Model, Types } = require('mongoose')

const OrderSchema = new Schema({
  trackingCode: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  delivered: {
    type: Boolean,
    required: true
  },
  notificationSent: {
    type: Boolean,
    required: true
  },
  events: [{
    status: {
      type: String,
      required: true
    },
    dateUpdate: {
      type: String,
      required: true
    },
    location: {
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    destination: {
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      type: {
        type: String,
        required: false
      }
    }
  }]
}, {
  timestamps: true
})

const Order = new Model('Orders', OrderSchema)

module.exports = Order
