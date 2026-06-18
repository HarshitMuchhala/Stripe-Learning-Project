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
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
      <h1>Membership Page</h1>

      <h2>Select Membership Plan</h2>

      <button onClick={() => setPlan("general")}>General Membership</button>

      <button onClick={() => setPlan("premium")}>Premium Membership</button>

      <h2>Select Billing Cycle</h2>

      <h2>Select Membership</h2>

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

      <h2>Billing Cycle</h2>
{/* Radio Buttons */}

      <label>
        <input
          type="radio"
          name="billing"
          value="monthly"
          onChange={(e) => setBillingCycle(e.target.value)}
        />
        Monthly
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="billing"
          value="quarterly"
          onChange={(e) => setBillingCycle(e.target.value)}
        />
        Quarterly
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="billing"
          value="yearly"
          onChange={(e) => setBillingCycle(e.target.value)}
        />
        Yearly
      </label>

      <hr />
<h2>User Information</h2>

<div>
  <input
    type="text"
    placeholder="Enter Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
  />
</div>

<br />

<div>
  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />
</div>

      <PaymentSummary 
      name={name}
      email={email}
      plan={plan} 
      billingCycle={billingCycle} 
      amount={amount} />
      
      
      {/* <p>Selected Plan: {plan || "None"}</p> */}
      {/* <p>Billing Cycle: {billingCycle || "None"}</p>
      <p>Amount: ₹{amount}</p> */}

      {/* <button onClick={handlePayment}>
  Pay Now
</button> */}
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
