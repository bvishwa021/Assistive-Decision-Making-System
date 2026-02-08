const InternshipCard = ({ index, data, setInternships }) => {
  const handleChange = (feature, value) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? { ...item, [feature]: value }
          : item
      )
    );
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h2 className="font-medium">
        Internship {index + 1}
      </h2>

      {[
        "stipend_satisfaction",
        "workload_intensity",
        "company_reputation",
        "time_flexibility"
      ].map((feature) => (
        <div key={feature}>
          <label className="block text-sm">
            {feature.replace("_", " ")}
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={data[feature]}
            onChange={(e) =>
              handleChange(feature, Number(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default InternshipCard;
