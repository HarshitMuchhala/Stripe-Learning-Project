                                    
import { useEffect } from "react";

import {useNavigate,useSearchParams,useLocation,} from "react-router-dom";

import {
  getPaymentStatus,
} from "../services/paymentStatusApi";

function Processing() {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] =
    useSearchParams();

  const paymentIntentId =
    searchParams.get(
      "payment_intent"
    );

  useEffect(() => {

    const interval =
      setInterval(async () => {

        try {

          const response =
            await getPaymentStatus(
              paymentIntentId
            );

          console.log(
            "Payment Status:",
            response.status
          );

          if (
            response.status ===
            "succeeded"
          ) {

            clearInterval(interval);

        navigate("/success", { state: location.state });

          }

          if (
            response.status ===
            "failed"
          ) {

            clearInterval(interval);

            navigate("/failed");

          }

        } catch (error) {

          console.log(error);

        }

      }, 2000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{
        width: "40px",
        height: "40px",
        border: "3px solid #f3f4f6",
        borderTop: "3px solid #000000",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "24px"
      }}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
      <h1 style={{ fontSize: "20px", fontWeight: "500", margin: "0 0 8px 0" }}>
        Processing Payment
      </h1>
      <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
        Please wait while we verify your transaction...
      </p>
    </div>
  );

}

export default Processing;