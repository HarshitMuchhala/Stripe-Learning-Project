// /**
//  * ============================================================
//  *  routes/payment.js
//  * ============================================================
//  * Defines all payment-related endpoints.
//  *
//  * Each route wires together:
//  *   1. The URL path + HTTP method
//  *   2. Any middleware that should run first (validation)
//  *   3. The controller function that handles the request
//  *
//  * Mounted in server.js as:
//  *   app.use("/api/payment", paymentRoutes)
//  * ============================================================
//  */

// const express = require("express");
// const router = express.Router();

// const { createPaymentIntent } = require("../controllers/paymentController");
// const validatePayment = require("../middleware/validatePayment");

// /**
//  * @route   POST /api/payment/create-payment-intent
//  * @desc    Validates incoming payment details and creates a
//  *          mock payment intent (placeholder for real Stripe call)
//  * @access  Public (no auth in this learning project)
//  *
//  * Request body example:
//  * {
//  *   "name": "Harshit",
//  *   "email": "harshit@example.com",
//  *   "plan": "premium",
//  *   "billingCycle": "yearly",
//  *   "amount": 4999
//  * }
//  */
// //router.post("/create-payment-intent", validatePayment, createPaymentIntent);
// router.post(
//   "/create-payment-intent",
//   (req, res) => {
//     console.log(req.body);

//     res.json({
//       success: true,
//       message:
//         "Mock payment intent created",
//       data: {
//         paymentIntentId:
//           "pi_mock_12345",
//       },
//     });
//   }
// );
// module.exports = router;



const express = require("express");

const router = express.Router();

const {
  createStripePaymentIntent,
} = require("../services/stripeService");

router.post(
  "/create-payment-intent",
  async (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log(
        "AMOUNT:",
        req.body.amount
      );

      const { amount } = req.body;

      const paymentIntent =
        await createStripePaymentIntent(
          amount
        );

      res.json({
        success: true,
        clientSecret:
          paymentIntent.client_secret,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Stripe Payment Intent Failed",
      });
    }
  }
);

module.exports = router;