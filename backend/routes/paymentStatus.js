const express = require("express");

const router = express.Router();

const { getStripePaymentIntentStatus } = require("../services/stripeService");

router.get(
  "/status/:id",

  async (req, res) => {

    try {
      const paymentId =
        req.params.id;

      const payment =
        await getStripePaymentIntentStatus(paymentId);

      if (payment.status === "requires_payment_method" || payment.status === "canceled") {
        return res.json({ status: "failed" });
      }

      res.json({ status: payment.status });
    } catch (error) {
      console.error(error);
      res.json({ status: "failed" });
    }

  }
);

module.exports = router;