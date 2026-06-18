# Stripe Learning Project — Backend

A Node.js + Express backend that **simulates** a Stripe payment workflow. No
real Stripe integration exists yet — every "payment" is a mock object — but
the code is structured exactly like a production backend so that adding
real Stripe later is a small, isolated change instead of a rewrite.

This project intentionally has **no database** and **no authentication**.
The goal is to teach the request/response flow between a React frontend and
an Express backend, and to show where Stripe will eventually plug in.

---

## Tech Stack

| Tool      | Purpose                                   |
|-----------|--------------------------------------------|
| Node.js   | JavaScript runtime                         |
| Express   | Web framework / routing                    |
| dotenv    | Loads `.env` environment variables         |
| cors      | Allows the React frontend to call this API |
| nodemon   | Auto-restarts server during development    |

---

## Folder Structure

```
backend/
├── controllers/
│   └── paymentController.js   # Handles request/response, calls the service layer
├── routes/
│   └── payment.js             # Defines URL endpoints + which middleware/controller runs
├── services/
│   └── stripeService.js       # Mock "Stripe SDK" — will hold real Stripe calls later
├── middleware/
│   └── validatePayment.js     # Validates incoming payment request bodies
├── utils/
│   └── responseHandler.js     # successResponse() / errorResponse() helpers
├── server.js                  # App entry point: middleware, routes, error handling
├── .env                       # Environment variables (PORT, future Stripe keys)
├── package.json
└── README.md
```

This is the standard **MVC (Model-View-Controller)** pattern adapted for an
API-only backend — there's no "View" since React owns the UI, but the
Route → Controller → Service separation mirrors it closely.

---

## Getting Started

```bash
cd backend
npm install
npm run dev      # starts with nodemon (auto-restart on file changes)
# or
npm start         # starts normally with node
```

The server runs at:

```
http://localhost:5000
```

---

## API Endpoints

### Health Check

```
GET /api/health
```

**Response**
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Create Payment Intent (Mock)

```
POST /api/payment/create-payment-intent
```

**Request Body**
```json
{
  "name": "Harshit",
  "email": "harshit@example.com",
  "plan": "premium",
  "billingCycle": "yearly",
  "amount": 4999
}
```

**Success Response** (`201 Created`)
```json
{
  "success": true,
  "message": "Mock payment intent created",
  "data": {
    "paymentIntentId": "pi_mock_123456",
    "amount": 4999,
    "currency": "INR",
    "status": "requires_payment_method"
  }
}
```

**Validation Error Response** (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Email format is invalid."
  ]
}
```

Validation rules enforced by `middleware/validatePayment.js`:
- `name` — required, non-empty string
- `email` — required, must match a valid email format
- `plan` — required, non-empty string
- `billingCycle` — required, non-empty string
- `amount` — required, must be a number greater than `0`

---

## Request Flow (Today — Mock Phase)

```
React (Axios request)
        |
        v
Express Route            (routes/payment.js)
        |
        v
Validation Middleware    (middleware/validatePayment.js)
        |
        v
Controller               (controllers/paymentController.js)
        |
        v
Service Layer            (services/stripeService.js)  <-- returns MOCK data
        |
        v
Response Handler         (utils/responseHandler.js)
        |
        v
JSON response back to React
```

## Request Flow (Future — Real Stripe Phase)

```
React
  -> Node.js / Express (same routes & controllers, unchanged)
  -> Stripe API (services/stripeService.js using the real Stripe SDK)
  -> Stripe Response (real PaymentIntent object or error)
  -> Express forwards the result to React
  -> React shows the user a Success or Failure screen
```

The key idea: **only `services/stripeService.js` changes** when real Stripe
is introduced. Routes, controllers, middleware, and the response format all
stay exactly the same, because the controller doesn't know (or care)
whether the service layer is returning mock data or real Stripe data.

---

## Adding Real Stripe Later (Phase 2 Checklist)

1. `npm install stripe`
2. Add your real key to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxxxxx
   ```
3. In `services/stripeService.js`, initialize the SDK:
   ```js
   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
   ```
4. Replace the mock logic inside `createPaymentIntent()`, `confirmPayment()`,
   and `createCustomer()` with the real `stripe.*` calls. Each function
   already has a commented example showing exactly what to swap in.
5. Nothing else in the codebase needs to change.

---

## Error Handling

- Validation errors are caught by `middleware/validatePayment.js` and
  return a `400` with a list of specific error messages.
- Any unexpected/unhandled error (e.g. malformed JSON, a thrown exception)
  is caught by the global error handler in `server.js` and always returns:
  ```json
  {
    "success": false,
    "message": "Something went wrong"
  }
  ```
- Unknown routes return a `404` with a descriptive message via the same
  `errorResponse()` helper, so every error in the app has the same shape.

---

## Connecting the React Frontend

From the `frontend/` app, point Axios at this backend's base URL
(`http://localhost:5000`) and call the endpoints above directly, for
example:

```js
// frontend/services/paymentService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const createPaymentIntent = (paymentData) => {
  return axios.post(`${API_BASE_URL}/payment/create-payment-intent`, paymentData);
};
```

Because `cors()` is enabled in `server.js`, the frontend (typically running
on `http://localhost:3000`) can call this backend without extra
configuration.
