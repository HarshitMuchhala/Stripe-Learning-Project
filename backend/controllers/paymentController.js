
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
