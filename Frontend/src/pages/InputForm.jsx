import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEATURES } from "../logic/FeatureConfig";
import FeatureSlider from "../components/FeatureSlider";
import { getInsights } from "../services/api";
import Navbar from "../components/Navbar";
import '../index.css';

const MAX_INTERNSHIPS = 4;

const createEmptyInputs = (id) => {
  const base = FEATURES.reduce((acc, f) => {
    acc[f.key] = 3; // neutral default
    return acc;
  }, {});

  return {
    id,
    name: "",
    inputs: base,
  };
};

function InputForm() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([
    createEmptyInputs(1),
  ]);

  const handleChange = (internshipId, key, value) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === internshipId
          ? {
            ...item,
            inputs: {
              ...item.inputs,
              [key]: value,
            },
          }
          : item
      )
    );
  };

  const handleNameChange = (internshipId, value) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === internshipId ? { ...item, name: value } : item
      )
    );
  };

  const addInternship = () => {
    if (internships.length >= MAX_INTERNSHIPS) return;

    setInternships((prev) => [
      ...prev,
      createEmptyInputs(prev.length + 1),
    ]);
  };

  const handleSubmit = async () => {
    const apiPayload = internships.map((internship) => ({
      name: internship.name || `Internship ${internship.id}`,
      stipend: internship.inputs.stipend_satisfaction,
      workload: internship.inputs.workload_intensity,
      company_reputation: internship.inputs.company_reputation,
      time_flexibility: internship.inputs.time_flexibility,
    }));

    try {
      const result = await getInsights(apiPayload);
      const comparative =
        internships.length > 1
          ? {
            type: "comparative",
            internshipIds: internships.map((i) => i.id),
          }
          : null;

      navigate("/insight", {
        state: {
          individualResults: result,
          comparative
        },
      });
    } catch (error) {
      console.error("API error:", error);
    }
    console.log("Internships state:", internships);
    console.log("Payload:", apiPayload);
  };

  const count = internships.length;
  const gridCols =
    count === 1 ? "flex justify-center" :
      count === 2 ? "grid grid-cols-2 gap-6" :
        count === 3 ? "grid grid-cols-3 gap-6" :
          "grid grid-cols-4 gap-6";

  const cardWidth =
    count === 1 ? "max-w-md w-full" : "w-full";

  return (
    <div className="min-h-screen bg-[#FFFDF1]">
      <Navbar />

      <div className="px-10 py-5">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#562F00]">
              Internship Expectations
            </h2>
            <p className="text-sm text-[#7A4A1A] max-w-2xl">
              Add up to four internship options and describe your expected experience across key attributes.
            </p>
          </div>

          {internships.length < MAX_INTERNSHIPS && (
            <button
              onClick={addInternship}
              className="px-4 py-2 rounded-lg bg-transparent border text-[#562F00] hover:bg-[#ff9644]/10
              hover:opacity-90 transition"
            >
              + Add Internship
            </button>
          )}
        </div>

        <div className={gridCols}>
          {internships.map((internship, index) => (
            <div
              key={internship.id}
              className={`bg-[#FFFeF6] border border-[#e6d8c3]  rounded-xl shadow-sm p-4 space-y-4 transform transition-all duration-300 ease-in-out hover:border-[#562f00]/25 animate-fadeIn ${cardWidth}`}>
              <div>
                <h3 className="text-lg font-semibold text-[#562F00]">
                  Internship {index + 1}
                </h3>
                <input
                  type="text"
                  placeholder="Assign a name"
                  value={internship.name}
                  onChange={(e) =>
                    handleNameChange(
                      internship.id,
                      e.target.value
                    )
                  }
                  className="mt-1 w-full text-sm px-3 py-1.5 rounded-md border border-[#e6d8c3] focus:outline-none focus:ring-1 focus:ring-[#ff9644]"
                />
              </div>

              {FEATURES.map((feature) => (
                <div key={feature.key} className="space-y-1">
                  <div className="flex items-center justify-between text-sm font-medium text-[#562F00]">
                    <div className="flex items-center gap-1">
                      {feature.label}
                      <span className="relative group cursor-pointer text-[#FF9644]"> ⓘ
                        <span className="absolute z-10 hidden group-hover:block w-48 text-xs text-[#562F00] bg-[#FFFDF1] border border-[#E6D8C3] p-2 rounded shadow-md top-5 left-0">
                          {feature.description}
                        </span>
                      </span>
                    </div>
                    <span className="text-[#7A5A2E]">
                      {internship.inputs[feature.key]}
                    </span>
                  </div>

                  <FeatureSlider
                    min={feature.min}
                    max={feature.max}
                    value={internship.inputs[feature.key]}
                    onChange={(value) =>
                      handleChange(
                        internship.id,
                        feature.key,
                        value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[#FF9644] text-[#562F00] hover:bg-[#fc9f58] hover:border-amber-900 transition font-semibold"
          >
            See Insights
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputForm;