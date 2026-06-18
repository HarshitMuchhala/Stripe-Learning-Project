/**
 * ============================================================
 *  paymentController.js  (Controller Layer)
 * ============================================================
 * THE FRONTEND FLOW (current, mock phase):
 *
 *   React (Axios POST request)
 *        |
 *        v
 *   Express Route  (routes/payment.js)
 *        |
 *        v
 *   Validation Middleware  (middleware/validatePayment.js)
 *        |
 *        v
 *   Controller (THIS FILE)
 *        |
 *        v
 *   Service Layer  (services/stripeService.js)
 *        |
 *        v
 *   Response sent back to React
 *
 * THE FUTURE FLOW (once real Stripe is added):
 *
 *   React
 *     -> Node.js / Express (this same controller)
 *     -> Stripe API (via services/stripeService.js)
 *     -> Stripe sends back a real PaymentIntent / error
 *     -> Express sends that result back to React
 *     -> React shows the user Success or Failure
 *
 * A controller's job is ONLY to:
 *   1. Read data from the request (req.body)
 *   2. Call the appropriate service function
 *   3. Send a response using our responseHandler helpers
 *
 * It should NOT contain Stripe-specific logic - that belongs
 * in services/stripeService.js.
 * ============================================================
 */

const stripeService = require("../services/stripeService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

/**
 * POST /api/payment/create-payment-intent
 *
 * Creates a (currently mock) payment intent for the given
 * plan/billing details. Validation has already happened in
 * the validatePayment middleware by the time this runs.
 */
async function createPaymentIntent(req, res) {
  try {
    const { name, email, plan, billingCycle, amount } = req.body;

    // Call the service layer instead of talking to Stripe directly.
    // Today this returns a mock object; later it will call the
    // real Stripe SDK with the exact same function signature.
    const mockPaymentIntent = await stripeService.createPaymentIntent({
      name,
      email,
      plan,
      billingCycle,
      amount,
      currency: "INR",
    });

    return successResponse(res, "Mock payment intent created", mockPaymentIntent, 201);
  } catch (error) {
    // Pass the error along to our centralized error handler in server.js
    // by forwarding it via next() would also work, but since we're async
    // we handle it directly here for clarity in this learning project.
    console.error("Error creating payment intent:", error.message);
    return errorResponse(res, "Failed to create payment intent.", 500);
  }
}

module.exports = {
  createPaymentIntent,
};
