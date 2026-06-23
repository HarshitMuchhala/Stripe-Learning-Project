function PlanCard({
  title,
  monthlyPrice,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: selected
          ? "2px solid #000000"
          : "1px solid #e5e7eb",
        padding: "24px",
        marginBottom: "16px",
        cursor: "pointer",
        borderRadius: "4px",
        backgroundColor: selected ? "#fafafa" : "#ffffff",
        transition: "all 0.2s ease"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "500", color: "#000000" }}>{title}</h3>
        {selected && (
          <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "#000000" }}>✓ Selected</span>
        )}
      </div>

      <p style={{ margin: "8px 0 0 0", color: "#666666" }}>
        Starting at ₹{monthlyPrice}/month
      </p>
    </div>
  );
}

export default PlanCard;