const express = require("express");

const router = express.Router();
const payments =
require("../utils/paymentStore");
const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

router.post(
    "/webhook",

    express.raw({
        type: "application/json",
    }),

    (req, res) => {

        const sig =
            req.headers["stripe-signature"];

        let event;

        try {

            event =
                stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    process.env
                        .STRIPE_WEBHOOK_SECRET
                );

        } catch (err) {

            console.log(
                "Webhook Error:",
                err.message
            );

            return res.status(400).send(
                `Webhook Error: ${err.message}`
            );
        }

        console.log(
            "Webhook Event Received:"
        );

        console.log(event.type);

        // Payment Success
        if (
            event.type ===
            "payment_intent.succeeded"
        ) {

            const paymentIntent =
                event.data.object;

            console.log(
                "Payment Successful:"
            );
payments[paymentIntent.id] = {
  status: "succeeded",
};

console.log(
  payments[paymentIntent.id]
);console.log(paymentIntent.id);

        }

        // Payment Failed
        if (
            event.type ===
            "payment_intent.payment_failed"
        ) {

            const paymentIntent =
  event.data.object;

payments[paymentIntent.id] = {
  status: "failed",
};

console.log(
  payments[paymentIntent.id]
);

        }

        res.json({
            received: true,
        });

    }
);

module.exports = router;
