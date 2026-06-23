import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      color: "#000000",
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "300", letterSpacing: "-0.02em", margin: "0 0 1rem 0" }}>Stripe Learning Project</h1>
      <p style={{ fontSize: "1.2rem", color: "#666666", margin: "0 0 3rem 0", fontWeight: "300" }}>Learn stripe payment integration with a simple project. This project demonstrates how to integrate Stripe payments.
      </p>
      <button 
        onClick={() => navigate("/membership")}
        style={{
          padding: "14px 28px",
          backgroundColor: "#000000",
          color: "#ffffff",
          border: "1px solid #000000",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
        onMouseOver={(e) => { e.target.style.backgroundColor = "#ffffff"; e.target.style.color = "#000000"; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = "#000000"; e.target.style.color = "#ffffff"; }}
      >
        View Membership Plans
      </button>
    </div>
  );
}

export default Home;
