require("dotenv").config();
const express = require("express");
const cors = require("cors");

const webhookRoutes       = require("./routes/webhook");
const paymentStatusRoutes = require("./routes/paymentStatus");
const paymentRoutes       = require("./routes/payment");
const { successResponse, errorResponse } = require("./utils/responseHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Webhook MUST come before express.json()
// Stripe verifies raw bytes — json() corrupts them
app.use("/api/payment", webhookRoutes);

app.use(express.json());

app.use("/api/payment", paymentStatusRoutes);
app.use("/api/payment", paymentRoutes); // registered ONCE only

app.get("/api/health", (req, res) =>
  successResponse(res, "Server is running", {}, 200)
);

app.use((req, res) =>
  errorResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, 404)
);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  return errorResponse(res, "Something went wrong", 500);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);