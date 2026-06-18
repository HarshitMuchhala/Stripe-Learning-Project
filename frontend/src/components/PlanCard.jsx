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
          ? "2px solid green"
          : "1px solid #ccc",
        padding: "20px",
        marginBottom: "15px",
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>

      <p>
        Starting at ₹{monthlyPrice}/month
      </p>

      {selected && (
        <p>✓ Selected</p>
      )}
    </div>
  );
}

export default PlanCard;