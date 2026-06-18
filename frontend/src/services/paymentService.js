/**
 * ============================================================
 *  paymentService.js  (Frontend)
 * ============================================================
 * Centralizes all Axios calls to the backend's payment API.
 * Components should import from here instead of calling
 * axios directly, so the API base URL and endpoint paths
 * only live in ONE place.
 *
 * Flow:
 *   React Component -> this file (Axios) -> Express backend
 * ============================================================
 */

import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Calls the backend to create a (currently mock) payment intent.
 *
 * @param {object} paymentData - { name, email, plan, billingCycle, amount }
 * @returns {Promise} Axios response promise
 */
export const createPaymentIntent = 
async (payload) => {
    const response =
      await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        payload);
    return response.data;
};

/**
 * Simple ping to confirm the backend is reachable.
 */
export const checkServerHealth = () => {
  return axios.get(`${API_BASE_URL}/health`);
};
