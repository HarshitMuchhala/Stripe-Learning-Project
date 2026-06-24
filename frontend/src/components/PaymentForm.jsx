import { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import { createPaymentIntent } from "../services/paymentApi";

function PaymentForm({ name, email, plan, billingCycle, amount }) {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      // STEP 1
      // Create Payment Intent from backend

      const response = await createPaymentIntent({
        name,
        email,
        plan,
        billingCycle,
        amount,
      });

      const clientSecret = response.clientSecret;

      // STEP 2
      // Get Card Element

      const cardElement = elements.getElement(CardElement);

      // STEP 3
      // Confirm Card Payment

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      // STEP 4
      // stripe error
if (result.error) {

  console.log(
    "Stripe Error:",
    result.error
  );

  switch (
    result.error.decline_code
  ) {

    case "incorrect_number":
      setError(
        "Incorrect card number"
      );
      break;

    case "incorrect_cvc":
      setError(
        "Incorrect CVV"
      );
      break;

    case "expired_card":
      setError(
        "Card has expired"
      );
      break;

    case "insufficient_funds":
      setError(
        "Insufficient balance"
      );
      break;

    case "lost_card":
      setError(
        "This card is reported lost"
      );
      break;

    case "stolen_card":
      setError(
        "This card is blocked"
      );
      break;

    case "do_not_honor":
      setError(
        "Bank declined payment"
      );
      break;

    default:
      setError(
        "Payment failed. Please try again."
      );
  }

  setLoading(false);

  return;
}

      // STEP 5
      // Payment Success
      const paymentIntent = result.paymentIntent;

      if (
        result.paymentIntent.status === "succeeded" || 
        result.paymentIntent.status === "processing" ||
        result.paymentIntent.status === "requires_capture"
      ) {
        navigate(`/processing?payment_intent=${paymentIntent.id}`, { state: { name, email, plan, billingCycle, amount } });
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      setError("Payment failed. Try another card.");

      setLoading(false);
    }


    };


  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          border: "1px solid #e5e7eb",
          padding: "16px",
          borderRadius: "4px",
          marginTop: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#000000', '::placeholder': { color: '#aab7c4' } } } }} />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 28px",
          backgroundColor: "#000000",
          color: "#ffffff",
          border: "1px solid #000000",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s ease",
          marginTop: "24px"
        }}
        onMouseOver={(e) => { if(!loading) { e.target.style.backgroundColor = "#ffffff"; e.target.style.color = "#000000"; } }}
        onMouseOut={(e) => { if(!loading) { e.target.style.backgroundColor = "#000000"; e.target.style.color = "#ffffff"; } }}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>

      {error && (
        <p
          style={{
            color: "#000000",
            marginTop: "16px",
            padding: "12px",
            border: "1px solid #000000",
            borderRadius: "4px",
            backgroundColor: "#fafafa",
            fontSize: "0.9rem"
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default PaymentForm;
