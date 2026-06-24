import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { getPaymentStatus } from "../services/paymentStatusApi";

const POLL_MS = 2000;
const TIMEOUT_MS = 30000;

function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const start = useRef(Date.now());

  useEffect(() => {
    if (!paymentIntentId) {
      navigate("/failed", { state: { reason: "Missing payment reference." } });
      return;
    }
    const interval = setInterval(async () => {
      if (Date.now() - start.current > TIMEOUT_MS) {
        clearInterval(interval);
        navigate("/failed", { state: {
          reason: "Verification timed out. Contact support." } });
        return;
      }
      try {
        const r = await getPaymentStatus(paymentIntentId);
        switch (r.status) {
          case "succeeded":
            clearInterval(interval);
            navigate("/success", { state: location.state });
            break;
          case "failed":
          case "requires_payment_method":
            clearInterval(interval);
            navigate("/failed", { state: {
              ...location.state,
              reason: r.failureMessage || "Your payment was declined." } });
            break;
          case "processing":
            clearInterval(interval);
            navigate("/under-review", { state: {
              ...location.state, source: "bank_processing",
              message: "Your bank is reviewing this payment. Typically resolves in 2-4 business days." } });
            break;
          case "under_review":
            clearInterval(interval);
            navigate("/under-review", { state: {
              ...location.state, source: "radar_review",
              reason: r.reviewReason,
              message: "Our security team flagged this payment for a routine review." } });
            break;
          case "canceled":
            clearInterval(interval);
            navigate("/canceled", { state: location.state });
            break;
          default:
            break; // keep polling
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }, POLL_MS);
    return () => clearInterval(interval);
  }, [paymentIntentId]);

  return (
    <div style={{ display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      minHeight:"100vh", fontFamily:"system-ui,sans-serif" }}>
      <div style={{ width:40, height:40, border:"3px solid #f3f4f6",
        borderTop:"3px solid #000", borderRadius:"50%",
        animation:"spin 1s linear infinite", marginBottom:24 }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
      <h1 style={{ fontSize:20, fontWeight:500, margin:"0 0 8px" }}>
        Processing Payment
      </h1>
      <p style={{ fontSize:14, color:"#6b7280", margin:0 }}>
        Please wait while we verify your transaction...
      </p>
    </div>
  );
}
export default Processing;