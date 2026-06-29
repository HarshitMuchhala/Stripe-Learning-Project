// import { useLocation, useNavigate } from "react-router-dom";

// function UnderReview() {
//   const { state = {} } = useLocation();
//   const navigate = useNavigate();

//   const isRadar = state.source === "radar_review";

//   const steps = [
//     { label: "Payment received by Stripe", done: true },
//     { label: isRadar ? "Flagged for security review" : "Bank processing payment", done: false, active: true },
//     { label: "Review complete (2–4 business days)", done: false },
//     { label: "Access granted or funds released", done: false },
//   ];

//   return (
//     <div style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       minHeight: "100vh", backgroundColor: "#f9fafb",
//       fontFamily: "system-ui, -apple-system, sans-serif",
//     }}>
//       <div style={{
//         backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
//         boxShadow: "0 4px 6px rgba(0,0,0,.05)", borderTop: "6px solid #f59e0b",
//         maxWidth: "480px", width: "100%", color: "#374151",
//       }}>

//         {/* Icon */}
//         <div style={{
//           width: "56px", height: "56px", borderRadius: "50%",
//           backgroundColor: "#fffbeb", border: "2px solid #f59e0b",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           margin: "0 auto 20px", fontSize: "26px",
//         }}>
//           {isRadar ? "🔍" : "⏳"}
//         </div>

//         <h1 style={{ fontSize: "22px", fontWeight: "600", textAlign: "center", margin: "0 0 10px", color: "#92400e" }}>
//           Payment Under Review
//         </h1>
//         <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", margin: "0 0 28px", lineHeight: "1.6" }}>
//           {state.message ||
//             "Your payment is being reviewed. This is a routine check and typically resolves within 2–4 business days."}
//         </p>

//         {/* Payment details */}
//         {(state.name || state.amount) && (
//           <div style={{
//             fontSize: "14px", lineHeight: "1.8",
//             backgroundColor: "#fffbeb", border: "1px solid #fde68a",
//             borderRadius: "8px", padding: "14px 16px", marginBottom: "24px",
//           }}>
//             {state.name && (
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ color: "#9ca3af" }}>Name</span>
//                 <span style={{ fontWeight: "500" }}>{state.name}</span>
//               </div>
//             )}
//             {state.email && (
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ color: "#9ca3af" }}>Email</span>
//                 <span style={{ fontWeight: "500" }}>{state.email}</span>
//               </div>
//             )}
//             {state.plan && (
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ color: "#9ca3af" }}>Plan</span>
//                 <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{state.plan}</span>
//               </div>
//             )}
//             {state.amount && (
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ color: "#9ca3af" }}>Amount held</span>
//                 <span style={{ fontWeight: "600" }}>₹{state.amount}</span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Timeline */}
//         <div style={{ marginBottom: "24px" }}>
//           <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "12px", color: "#374151" }}>
//             What happens next
//           </p>
//           {steps.map((step, i) => (
//             <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
//               <div style={{
//                 width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
//                 marginTop: "1px",
//                 backgroundColor: step.done ? "#10b981" : step.active ? "#f59e0b" : "#e5e7eb",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: "10px", color: "#fff", fontWeight: "700",
//               }}>
//                 {step.done ? "✓" : step.active ? "●" : ""}
//               </div>
//               <span style={{
//                 fontSize: "13px",
//                 color: step.active ? "#92400e" : step.done ? "#374151" : "#9ca3af",
//                 fontWeight: step.active ? "500" : "400",
//               }}>
//                 {step.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Notice */}
//         <div style={{
//           backgroundColor: "#f0f9ff", border: "1px solid #bae6fd",
//           borderRadius: "8px", padding: "12px 16px",
//           fontSize: "13px", color: "#0369a1", marginBottom: "24px",
//         }}>
//           📧 You'll receive an email at <strong>{state.email || "your registered email"}</strong> once
//           the review is complete. No money has been deducted yet.
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           style={{
//             width: "100%", padding: "12px",
//             backgroundColor: "#374151", color: "#fff",
//             border: "none", borderRadius: "6px",
//             fontSize: "14px", fontWeight: "500", cursor: "pointer",
//           }}
//         >
//           Return to Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UnderReview;



//NEW 
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPaymentStatus } from "../services/paymentStatusApi";

const POLL_MS = 5000;

function UnderReview() {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const paymentIntentId = state.paymentIntentId || localStorage.getItem("payment_intent_id");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paymentIntentId) return; // nothing to poll against

    intervalRef.current = setInterval(async () => {
      try {
        const r = await getPaymentStatus(paymentIntentId);

        switch (r.status) {
          case "success":
          case "succeeded":
            clearInterval(intervalRef.current);
            navigate("/success", { state: { ...state, paymentIntentId } });
            break;

          case "failed":
            clearInterval(intervalRef.current);
            navigate("/failed", {
              state: { ...state, paymentIntentId, reason: r.failureMessage || "Payment was declined after review." },
            });
            break;

          case "refunded":
          case "partially_refunded":
            clearInterval(intervalRef.current);
            navigate("/failed", {
              state: { ...state, paymentIntentId, reason: "Payment was refunded after review." },
            });
            break;

          case "under_review":
          default:
            break; // keep polling
        }
      } catch (e) {
        console.error("Under-review poll error:", e);
      }
    }, POLL_MS);

    return () => clearInterval(intervalRef.current);
  }, [paymentIntentId]);
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
          borderTop: "6px solid #f59e0b",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "#374151",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#fffbeb",
            border: "2px solid #f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "24px",
            color: "#f59e0b",
            fontWeight: "600",
          }}
        >
          !
        </div>

        <h1 style={{ fontSize: "24px", margin: "0 0 8px 0", fontWeight: "600", color: "#b45309" }}>
          Payment Under Review
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 32px 0", lineHeight: "1.6" }}>
          {state.message ||
            "Your transaction is currently under review for security verification."}
          <br />
          This process may take 2–3 working days. We will notify you once the review is completed.
        </p>

        <div style={{ textAlign: "left", marginBottom: "32px", fontSize: "14px", lineHeight: "1.6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Name</span>
            <span style={{ fontWeight: "500" }}>{state.name || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Email</span>
            <span style={{ fontWeight: "500" }}>{state.email || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: "8px", marginBottom: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Plan</span>
            <span style={{ fontWeight: "500", textTransform: "capitalize" }}>{state.plan || "N/A"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
            <span style={{ color: "#9ca3af" }}>Amount held</span>
            <span style={{ fontWeight: "600" }}>₹{state.amount || 0}</span>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0 0 24px 0", lineHeight: "1.6" }}>
          No money has been deducted yet. Need help?{" "}
          <a href="mailto:support@yourcompany.com" style={{ color: "#374151", fontWeight: 500 }}>
            Contact support
          </a>{" "}
          and reference order {state.paymentIntentId || "—"}.
        </p>

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
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1f2937")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#374151")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default UnderReview;