import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEATURES } from "../logic/FeatureConfig";
import FeatureSlider from "../components/FeatureSlider";
import { encodeInput } from "../logic/EncodeInput";
import { getMockCluster } from "../logic/MockCluster";
import Navbar from "../components/Navbar";

const MAX_INTERNSHIPS = 4;

const createEmptyInputs = (id) => {
  const base = FEATURES.reduce((acc, f) => {
    acc[f.key] = 3; // neutral default
    return acc;
  }, {});

  return {
    id,
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

  const addInternship = () => {
    if (internships.length >= MAX_INTERNSHIPS) return;

    setInternships((prev) => [
      ...prev,
      createEmptyInputs(prev.length + 1),
    ]);
  };

  const handleSubmit = () => {
    const individualResults = internships.map((internship) => {
      const encodedVector = encodeInput(internship.inputs);
      const clusterId = getMockCluster(encodedVector);

      return {
        id: internship.id,
        inputs: internship.inputs,
        encodedVector,
        clusterId,
      };
    });

    const comparative =
      internships.length > 1
        ? {
            type: "comparative",
            internshipIds: internships.map((i) => i.id),
          }
        : null;

        navigate("/insight", {
      state: {
        individualResults,
        comparative,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
  
      <h2 className="text-2xl font-semibold mb-2">Internship Expectations</h2>

      <p className="text-gray-600 mb-8">
        Add up to four internship options and describe what you expect
        from each.
      </p>

      <div className="space-y-8">
        
      {internships.map((internship, index) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              <h3 className="text-lg font-medium">
                Internship {index + 1}
              </h3>

              {FEATURES.map((feature) => (
                <FeatureSlider
                  key={feature.key}
                  label={feature.label}
                  description={feature.description}
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
              ))}
            </div>
          ))}

          {internships.length < MAX_INTERNSHIPS && (
            <button
              onClick={addInternship}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              + Add another internship
            </button>
          )}

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              See Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
