import { useState } from "react";
import {useNavigate} from "react-router-dom";
import PlanCard from "../components/PlanCard";
import PaymentSummary from "../components/PaymentSummary";
import PaymentForm
from "../components/PaymentForm";
import {
  createPaymentIntent,
} from "../services/paymentApi";


function Membership() {
const navigate = useNavigate();

  const [plan, setPlan] = useState("");
  const [billingCycle, setBillingCycle] = useState("");

const [name, setName] = useState("");
const [email, setEmail] = useState("");



  const prices = {
    general: {
      monthly: 199,
      quarterly: 549,
      yearly: 1999,
    },

    premium: {
      monthly: 499,
      quarterly: 1399,
      yearly: 4999,
    },
  };

const amount = prices[plan]?.[billingCycle] || 0;
// const handlePayment = async () => {
//   try {

//  // Validation
//     if (!name) {
//       alert("Name is required");
//       return;
//     }

//     if (!email) {
//       alert("Email is required");
//       return;
//     }

//     if (!plan) {
//       alert("Select a membership plan");
//       return;
//     }

//     if (!billingCycle) {
//       alert("Select billing cycle");
//       return;
//     }
//   // Payload
//     const payload = {
//       name,
//       email,
//       plan,
//       billingCycle,
//       amount,
//     };

//     console.log(
//       "Sending Payload:",
//       payload
//     );
// //API Call
//     const response =
//       await createPaymentIntent(
//         payload
//       );

//     console.log(
//       "Backend Response:",
//       response
//     );
//     navigate("/success", {
//   state: payload,
// });
//   } catch (error) {
//     console.log(error);
//     alert("Payment Failed");
//   }
// };
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#000000",
        backgroundColor: "#ffffff",
      }}
    >
      <button 
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          color: "#6b7280",
          cursor: "pointer",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
          transition: "color 0.2s"
        }}
        onMouseOver={(e) => e.target.style.color = "#000000"}
        onMouseOut={(e) => e.target.style.color = "#6b7280"}
      >
        ← Return to Home
      </button>
<h1
  style={{
    fontSize: "2.5rem",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    marginBottom: "40px",
    textAlign: "center",
  }}
>
  Membership Checkout
</h1>
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "500", marginBottom: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>1. Select Plan</h2>

        <PlanCard
          title="General Membership"
          monthlyPrice={199}
          selected={plan === "general"}
          onSelect={() => setPlan("general")}
        />

        <PlanCard
          title="Premium Membership"
          monthlyPrice={499}
          selected={plan === "premium"}
          onSelect={() => setPlan("premium")}
        />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "500", marginBottom: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>2. Billing Cycle</h2>

        <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="radio"
              name="billing"
              value="monthly"
              onChange={(e) => setBillingCycle(e.target.value)}
              style={{ cursor: "pointer", accentColor: "#000000" }}
            />
            Monthly
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="radio"
              name="billing"
              value="quarterly"
              onChange={(e) => setBillingCycle(e.target.value)}
              style={{ cursor: "pointer", accentColor: "#000000" }}
            />
            Quarterly
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="radio"
              name="billing"
              value="yearly"
              onChange={(e) => setBillingCycle(e.target.value)}
              style={{ cursor: "pointer", accentColor: "#000000" }}
            />
            Yearly
          </label>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "500", marginBottom: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>3. User Information</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              fontSize: "1rem",
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              fontSize: "1rem",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
        </div>
      </section>

      <PaymentSummary 
        name={name}
        email={email}
        plan={plan} 
        billingCycle={billingCycle} 
        amount={amount} 
      />

      <PaymentForm
        name={name}
        email={email}
        plan={plan}
        billingCycle={billingCycle}
        amount={amount}
      />
    </div>
  );
}

export default Membership;
