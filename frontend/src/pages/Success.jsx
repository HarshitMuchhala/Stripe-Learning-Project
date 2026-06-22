import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const data = location.state || {};

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <h1>Payment Successful</h1>

      <p>Your payment has been verified.</p>

      <hr />

      <p>Name: {data.name || "N/A"}</p>
      <p>Email: {data.email || "N/A"}</p>
      <p>Plan: {data.plan || "N/A"}</p>
      <p>Billing: {data.billingCycle || "N/A"}</p>
      <p>Amount: ₹{data.amount || 0}</p>
    </div>
  );
}

export default Success;
