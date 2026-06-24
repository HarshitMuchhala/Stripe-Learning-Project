const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  paymentIntentId: String,

  amount: Number,

  currency: String,

  customerName: String,

  customerEmail: String,

  plan: String,

  billingCycle: String,

  status: String,

  refundStatus: {
    type: String,
    default: null,
  },

  disputeStatus: {
    type: String,
    default: null,
  },

}, { timestamps: true });

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);