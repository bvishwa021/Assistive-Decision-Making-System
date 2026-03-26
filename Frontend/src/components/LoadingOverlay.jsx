import { useEffect, useState } from "react";

const STEPS = [
  "Reading your internship expectations...",
  "Identifying experience patterns...",
  "Mapping to archetype clusters...",
  "Generating your insights...",
];

function LoadingOverlay() {
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i]);
      }, i * 1000);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-[#FFFDF1]/90 border border-[#e6d8c3] rounded-2xl shadow-xl px-10 py-10 w-full max-w-md space-y-5">
        
        <h2 className="text-lg font-semibold text-[#562f00] tracking-tight">
          Analysing your options
        </h2>

        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-700 ease-out ${
                visibleSteps.includes(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                  visibleSteps.includes(i) ? "bg-[#FF9644]" : "bg-[#e6d8c3]"
                }`}
              />
              <p className="text-sm text-[#5f5548]">{step}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LoadingOverlay;