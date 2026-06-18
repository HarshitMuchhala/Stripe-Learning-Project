/**
 * ============================================================
 *  validatePayment.js  (Middleware)
 * ============================================================
 * Middleware runs BEFORE the controller. Its job here is to
 * check that the incoming request body has everything the
 * payment controller needs, and that it's in the right shape.
 *
 * Why validate here instead of inside the controller?
 * - Keeps the controller focused only on "business logic"
 * - Validation rules can be reused on other routes later
 * - If validation fails, we stop the request early and never
 *   waste time calling the (future) Stripe service
 *
 * Flow:
 *   Route -> validatePayment (this file) -> Controller
 * ============================================================
 */

const { errorResponse } = require("../utils/responseHandler");

// Simple, beginner-friendly email format check.
// (Not a full RFC-5322 validator on purpose - this is a learning project.)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayment(req, res, next) {
  const { name, email, plan, billingCycle, amount } = req.body;

  const errors = [];

  // --- name ---
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required.");
  }

  // --- email ---
  if (!email || typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required.");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Email format is invalid.");
  }

  // --- plan ---
  if (!plan || typeof plan !== "string" || plan.trim() === "") {
    errors.push("Plan is required.");
  }

  // --- billingCycle ---
  if (!billingCycle || typeof billingCycle !== "string" || billingCycle.trim() === "") {
    errors.push("Billing cycle is required.");
  }

  // --- amount ---
  // amount must exist, be a number, and be greater than 0
  if (amount === undefined || amount === null || amount === "") {
    errors.push("Amount is required.");
  } else if (typeof amount !== "number" || Number.isNaN(amount)) {
    errors.push("Amount must be a valid number.");
  } else if (amount <= 0) {
    errors.push("Amount must be greater than 0.");
  }

  // If anything failed validation, stop here and respond with 400
  if (errors.length > 0) {
    return errorResponse(res, "Validation failed.", 400, errors);
  }

  // All good - move on to the controller
  next();
}

module.exports = validatePayment;
