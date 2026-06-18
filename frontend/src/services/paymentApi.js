import axios from "axios";

export const createPaymentIntent =
  async (payload) => {
    const response =
      await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        payload
      );

    return response.data;
  };