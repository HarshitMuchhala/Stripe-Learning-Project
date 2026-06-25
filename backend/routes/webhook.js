const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const payments = require("../utils/paymentStore");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const obj = event.data.object;
    console.log("Webhook:", event.type);

    switch (event.type) {

      case "payment_intent.succeeded":
        payments[obj.id] = { status: "succeeded",
          chargeId: obj.latest_charge, updatedAt: new Date().toISOString() };
        break;

      case "payment_intent.payment_failed":
        payments[obj.id] = { status: "failed",
          failureMessage: obj.last_payment_error?.message || "Payment declined",
          failureCode: obj.last_payment_error?.decline_code,
          updatedAt: new Date().toISOString() };
        break;

      case "payment_intent.processing":
        payments[obj.id] = { status: "processing",
          updatedAt: new Date().toISOString() };
        break;

      case "review.started":
        if (obj.payment_intent) {
          payments[obj.payment_intent] = {
            ...payments[obj.payment_intent],
            status: "under_review",
            reviewId: obj.id,
            reviewReason: obj.reason,
            updatedAt: new Date().toISOString() };
        }
        break;

      case "review.closed":
        if (obj.payment_intent) {
          const s = obj.closed_reason === "approved" ? "succeeded"
            : obj.closed_reason === "refunded" ? "refunded" : "failed";
          payments[obj.payment_intent] = {
            ...payments[obj.payment_intent],
            status: s, updatedAt: new Date().toISOString() };
        }
        break;

      case "payment_intent.canceled":
        payments[obj.id] = { status: "canceled",
          cancellationReason: obj.cancellation_reason,
          updatedAt: new Date().toISOString() };
        break;

      case "charge.refunded":
        if (obj.payment_intent) {
          const partial = obj.amount_refunded < obj.amount;
          payments[obj.payment_intent] = {
            ...payments[obj.payment_intent],
            status: partial ? "partially_refunded" : "refunded",
            refundAmount: obj.amount_refunded,
            updatedAt: new Date().toISOString() };
        }
        break;

      case "charge.dispute.created":
        if (obj.payment_intent) {
          payments[obj.payment_intent] = {
            ...payments[obj.payment_intent],
            status: "disputed",
            disputeReason: obj.reason,
            updatedAt: new Date().toISOString() };
        }
        break;

      default:
        console.log("Unhandled event:", event.type);
    }

    res.json({ received: true });
  }
);

module.exports = router;