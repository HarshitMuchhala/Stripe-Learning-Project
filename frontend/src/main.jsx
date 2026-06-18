import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";
import { router } from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  </React.StrictMode>,
);
