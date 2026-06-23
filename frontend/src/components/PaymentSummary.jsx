function PaymentSummary({ name, email, plan, billingCycle, amount }) {
  return (
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        paddingTop: "24px",
        marginTop: "32px",
        marginBottom: "32px"
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: "300", margin: "0 0 16px 0", color: "#000000" }}>Payment Summary</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem", color: "#333333" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666666" }}>Name</span>
          <span>{name || "Not Provided"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666666" }}>Email</span>
          <span>{email || "Not Provided"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666666" }}>Plan</span>
          <span style={{ textTransform: "capitalize" }}>{plan || "None"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666666" }}>Billing</span>
          <span style={{ textTransform: "capitalize" }}>{billingCycle || "None"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e5e7eb", paddingTop: "8px", marginTop: "8px" }}>
          <span style={{ fontWeight: "500", color: "#000000" }}>Total Amount</span>
          <span style={{ fontWeight: "500", color: "#000000" }}>₹{amount}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
