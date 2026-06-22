/**
 * ============================================================
 *  server.js  -  Application Entry Point
 * ============================================================
 * This file:
 *   1. Loads environment variables
 *   2. Creates the Express app
 *   3. Registers global middleware (cors, json body parsing)
 *   4. Registers routes
 *   5. Registers a health check endpoint
 *   6. Registers a 404 handler + a global error handler
 *   7. Starts the server
 *
 * --------------------------------------------------------
 * HOW THIS BACKEND TALKS TO THE REACT FRONTEND (today):
 *
 *   React Component
 *     -> Axios Request (e.g. axios.post("/api/payment/create-payment-intent"))
 *     -> Express Route        (routes/payment.js)
 *     -> Validation Middleware (middleware/validatePayment.js)
 *     -> Controller            (controllers/paymentController.js)
 *     -> Service Layer         (services/stripeService.js)
 *     -> JSON Response         (utils/responseHandler.js)
 *     -> back to React
 *
 * HOW IT WILL WORK ONCE STRIPE IS ADDED (future):
 *
 *   React
 *     -> Node.js / Express (same routes & controllers)
 *     -> Stripe API (via services/stripeService.js using the real SDK)
 *     -> Stripe Response (real PaymentIntent / error from Stripe's servers)
 *     -> Express forwards that result to React
 *     -> React shows the user a Success or Failure screen
 *
 * Notice that routes, controllers, and middleware will NOT
 * need to change when Stripe is added - only stripeService.js
 * will be updated. That's the benefit of this MVC + service
 * layer structure.
 * ============================================================
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/payment");
const { successResponse, errorResponse } = require("./utils/responseHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------
// Global Middleware
// ------------------------------------------------------------
app.use(cors()); // Allows the React frontend (different origin/port) to call this API
app.use(express.json()); // Parses incoming JSON request bodies into req.body
app.use(
  "/api/payment",
  paymentRoutes
); 

// ------------------------------------------------------------
// Health Check Route
// ------------------------------------------------------------
// Useful for quickly confirming the server is up, and for the
// frontend (or deployment tools) to "ping" the backend.
app.get("/api/health", (req, res) => {
  return successResponse(res, "Server is running", {}, 200);
});

// ------------------------------------------------------------
// Feature Routes
// ------------------------------------------------------------
app.use("/api/payment", paymentRoutes); 

// ------------------------------------------------------------
// 404 Handler
// ------------------------------------------------------------
// Runs when no route above matched the request.
app.use((req, res) => {
  return errorResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
});

// ------------------------------------------------------------
// Global Error Handler
// ------------------------------------------------------------
// Express recognizes this as an error handler because it takes
// FOUR arguments (err, req, res, next). Any error passed to
// next(err) anywhere in the app, or any uncaught error thrown
// in a synchronous route, ends up here.
//
// Keeping one centralized error handler means every unexpected
// failure returns the SAME safe, predictable shape to the
// frontend instead of leaking stack traces or crashing the app.
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  return errorResponse(res, "Something went wrong", 500);
});

// ------------------------------------------------------------
// Start Server
// ------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
