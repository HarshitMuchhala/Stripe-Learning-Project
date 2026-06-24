const express = require("express");
const router = express.Router();
const { getStripePaymentIntentStatus } = require("../services/stripeService");
const payments = require("../utils/paymentStore");

const STATUS_MAP = {
  succeeded:               "succeeded",
  processing:              "processing",
  requires_action:         "requires_action",
  requires_payment_method: "failed",
  requires_confirmation:   "incomplete",
  canceled:                "canceled",
};

router.get("/status/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Webhook store has richest data — prefer it
    if (payments[id]) {
      return res.json(payments[id]);
    }

    // Fallback: ask Stripe directly
    const pi = await getStripePaymentIntentStatus(id);
    return res.json({
      status: STATUS_MAP[pi.status] || pi.status,
      stripeStatus: pi.status,
      failureMessage: pi.last_payment_error?.message,
      failureCode: pi.last_payment_error?.decline_code,
    });

  } catch (err) {
    console.error("Status error:", err.message);
    return res.json({ status: "failed",
      failureMessage: "Could not retrieve payment status" });
  }
});

module.exports = router;