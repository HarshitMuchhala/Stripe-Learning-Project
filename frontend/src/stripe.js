import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51PkfuwRsDTDlT1rR65LlGNZlYKsjTqnvBxDgSPheqSwR8kACr2hFoSwdvWlu39qQFbfAwKPhP4NgSuDxPWnR1aqG00wBJMGJ5X"
);