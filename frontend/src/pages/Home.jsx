import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Stripe Learning Project</h1>

      <p>Learn SaaS Payments</p>

      <button onClick={() => navigate("/membership")}>
        View Membership Plans
      </button>
    </div>
  );
}

export default Home;
