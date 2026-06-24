import { useNavigate } from "react-router-dom";

function Canceled() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", backgroundColor: "#f9fafb",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,.05)", borderTop: "6px solid #6b7280",
        maxWidth: "400px", width: "100%", textAlign: "center", color: "#374151",
      }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          backgroundColor: "#f3f4f6", border: "2px solid #9ca3af",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: "26px",
        }}>⊘</div>
        <h1 style={{ fontSize: "22px", fontWeight: "600", margin: "0 0 10px", color: "#374151" }}>
          Payment Canceled
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 28px", lineHeight: "1.6" }}>
          Your payment session expired or was canceled. No charges were made to your card.
        </p>
        <button
          onClick={() => navigate("/membership")}
          style={{
            width: "100%", padding: "12px", backgroundColor: "#374151",
            color: "#fff", border: "none", borderRadius: "6px",
            fontSize: "14px", fontWeight: "500", cursor: "pointer",
          }}
        >Try Again</button>
      </div>
    </div>
  );
}

export default Canceled;
