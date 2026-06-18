import { useState } from "react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import {
  createPaymentIntent,
} from "../services/paymentApi";

function PaymentForm({
  name,
  email,
  plan,
  billingCycle,
  amount,
}) {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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

      const response =
        await createPaymentIntent({
          name,
          email,
          plan,
          billingCycle,
          amount,
        });

      const clientSecret =
        response.clientSecret;

      // STEP 2
      // Get Card Element

      const cardElement =
        elements.getElement(CardElement);

      // STEP 3
      // Confirm Card Payment

      const result =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name,
                email,
              },
            },
          }
        );

      // STEP 4
      // Handle Errors

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // STEP 5
      // Payment Success

      if (
        result.paymentIntent.status ===
        "succeeded"
      ) {
        navigate("/success", {
          state: {
            name,
            email,
            plan,
            billingCycle,
            amount,
          },
        });
      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      setError(
        "Payment failed"
      );

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <CardElement />
      </div>

      <br />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : `Pay ₹${amount}`}
      </button>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default PaymentForm;