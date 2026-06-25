import { useLocation, useNavigate } from "react-router-dom";

function Failed() {
  const { state = {} } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", backgroundColor: "#f9fafb",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,.05)", borderTop: "6px solid #ef4444",
        maxWidth: "400px", width: "100%", textAlign: "center", color: "#374151",
      }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          backgroundColor: "#fef2f2", border: "2px solid #ef4444",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: "26px",
        }}>✕</div>
        <h1 style={{ fontSize: "22px", fontWeight: "600", margin: "0 0 10px", color: "#dc2626" }}>
          Payment Failed
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 28px", lineHeight: "1.6" }}>
          {state.reason || "Your payment could not be processed. Please try a different card."}
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/membership")}
            style={{
              flex: 1, padding: "12px", backgroundColor: "#374151",
              color: "#fff", border: "none", borderRadius: "6px",
              fontSize: "14px", fontWeight: "500", cursor: "pointer",
            }}
          >Try Again</button>
          <button
            onClick={() => navigate("/")}
            style={{
              flex: 1, padding: "12px", backgroundColor: "transparent",
              color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px",
              fontSize: "14px", cursor: "pointer",
            }}
          >Go Home</button>
        </div>
      </div>
    </div>
  );
}

export default Failed;
