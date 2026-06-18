const Stripe = require("stripe");

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

const createStripePaymentIntent =
  async (amount) => {

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "inr",
      });

    return paymentIntent;
};

module.exports = {
  createStripePaymentIntent,
};