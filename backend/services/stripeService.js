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

const getStripePaymentIntentStatus =
  async (paymentIntentId) => {
    const paymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  };

module.exports = {
  createStripePaymentIntent,
  getStripePaymentIntentStatus,
};