const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.stripeWebhook = async (req, res) => {

  const sig = req.headers['stripe-signature'];

  let event;

  try {

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {

    console.log(err.message);

    return res.status(400).send(`Webhook Error`);
  }

  console.log('EVENT TYPE:', event.type);

  switch (event.type) {

    case 'review.opened':
      console.log('Payment Under Review');
      break;

    case 'review.closed':
      console.log('Review Closed');
      break;

    case 'payment_intent.succeeded':
      console.log('Payment Success');
      break;

    case 'payment_intent.payment_failed':
      console.log('Payment Failed');
      break;

    case 'charge.succeeded':
      console.log('Charge Success');
      break;
  }

  res.json({ received: true });
};