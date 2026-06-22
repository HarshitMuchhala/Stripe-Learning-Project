import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          borderTop: "6px solid #10b981",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "#374151",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: "0 0 8px 0", fontWeight: "600", color: "#10b981" }}>Payment Successful</h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 32px 0" }}>
          Thank you for your purchase.
        </p>

        <div style={{ textAlign: "left", marginBottom: "32px", fontSize: "14px", lineHeight: "1.6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Name</span>
            <span style={{ fontWeight: "500" }}>{data.name || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Email</span>
            <span style={{ fontWeight: "500" }}>{data.email || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Plan</span>
            <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{data.plan || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Billing</span>
            <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{data.billingCycle || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Amount</span>
            <span style={{ fontWeight: "600" }}>₹{data.amount || 0}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#374151",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1f2937"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#374151"}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
