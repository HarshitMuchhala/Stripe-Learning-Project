import axios from "axios";

export const getPaymentStatus =
async (paymentId) => {

  const response =
    await axios.get(
      `http://localhost:5000/api/payment/status/${paymentId}`
    );

  return response.data;
};