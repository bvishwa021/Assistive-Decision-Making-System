function FeatureSlider({ label, description, value, onChange, min, max }) {
  return (
    <div>
      <div className="mb-2">
        <label className="font-medium">{label}</label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#A45A1F]"
      />
    </div>
  );
}

export default FeatureSlider;
