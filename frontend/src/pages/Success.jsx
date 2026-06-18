import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const paymentData = location.state;

  return (
    <div>
      <h1>Payment Successful</h1>

      <p>Name: {paymentData.name}</p>

      <p>Email: {paymentData.email}</p>

      <p>Plan: {paymentData.plan}</p>

      <p>
        Billing:
        {paymentData.billingCycle}
      </p>

      <p>
        Amount:
        ₹{paymentData.amount}
      </p>
    </div>
  );
}

export default Success;