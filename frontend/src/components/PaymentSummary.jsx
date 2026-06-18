function PaymentSummary({ name, email, plan, billingCycle, amount }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Payment Summary</h2>

      <p>Name: {name || "Not Provided"}</p>

      <p>Email: {email || "Not Provided"}</p>

      <p>Plan: {plan || "None"}</p>

      <p>Billing: {billingCycle || "None"}</p>

      <p>Amount: ₹{amount}</p>
    </div>
  );
}

export default PaymentSummary;
