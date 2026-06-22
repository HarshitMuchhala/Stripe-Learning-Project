// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// function Processing() {
//   const location = useLocation();
//   const paymentIntentId = location.state?.paymentIntentId;
//   const [status, setStatus] = useState("processing");

//   useEffect(() => {
//     const interval = setInterval(
//       async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/payment/status/${paymentIntentId}`,
//           );

//           const paymentStatus = response.data.status;

//           console.log("Payment Status:", paymentStatus);

//           setStatus(paymentStatus);

//           // SUCCESS
//           if (paymentStatus === "succeeded") {
//             clearInterval(interval);

//             window.location.href = "/success";
//           }

//           // FAILED
//           if (paymentStatus === "failed") {
//             clearInterval(interval);

//             window.location.href = "/failure";
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },

//       2000,
//     );

//     return () => clearInterval(interval);
//   }, [paymentIntentId]);

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "100px",
//       }}
//     >
//       <h1>Processing Payment...</h1>

//       <p>Please wait while we verify your payment.</p>

//       <p>Current Status: {status}</p>
//     </div>
//   );
// }

// export default Processing;
                                       

import { useEffect } from "react";

import {
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

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
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>
        Processing Payment...
      </h1>

      <p>
        Please wait while we
        verify your payment.
      </p>
    </div>
  );

}

export default Processing;