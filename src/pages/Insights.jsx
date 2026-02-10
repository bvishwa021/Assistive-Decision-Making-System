import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Insights() {
    const location = useLocation();
    const navigate = useNavigate();

    const { individualResults, comparative } = location.state || {};

    if (!individualResults) {
        return (
            <div className="min-h-screen bg-[#fffdf1] flex items-center justify-center">
                <p className="text-[#7A4A1A] italic text-lg">
                    No insights available. Please submit expectations first.
                </p>
            </div>
        );
    }

    const gridCols =
    individualResults.length === 1
      ? "grid-cols-1 max-w-3xl mx-auto"
      : individualResults.length === 2
      ? "grid-cols-2"
      : individualResults.length === 3
      ? "grid-cols-3"
      : "grid-cols-4";

    return (
        <div className="min-h-screen bg-[#fffdf1]">
            <Navbar />
            <div className="relative w-full px-10 py-5 space-y-10">
                <button
                onClick={() => navigate("/input")}
                className="absolute top-4 right-10 px-6 py-2 rounded-lg text-sm font-semibold bg-[#FF9644] text-[#562F00] hover:bg-[#fc9f58] transition"
                >
                    Go Back
                </button>
                <h1 className="text-2xl font-bold text-[#562f00]">Internship Insights</h1>

                {/* Individual Insight Cards */}
                <div className={`grid ${gridCols} gap-6`}>
                    {individualResults.map((result, index) => (
                        <div
                            key={result.id}
                            className="bg-white border border-[#efe6d8] rounded-xl p-4 space-y-4"
                        >
                            <h2 className="text-lg font-medium text-[#562f00]">
                                Internship {index + 1}
                            </h2>

                            <p className="text-sm text-[#5f5548]">
                                This internship aligns most closely with{" "}
                                <span className="font-semibold text-[#7a4a1d]">
                                    Cluster {result.clusterId}
                                </span>
                                .
                            </p>
                            <div className="text-sm text-[#6b6257] pt-2 space-y-1">
                                {Object.entries(result.inputs).map(
                                    ([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="capitalize">
                                                {key.replace("_", " ")}
                                            </span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparative Insight Card */}
                {comparative && (
                    <div className="max-w-5xl mx-auto bg-[#fffaf2] border border-[#f2e4cf] rounded-xl p-6 space-y-3">
                        <h2 className="text-lg font-medium text-[#562f00]">
                            Contextual Comparison
                        </h2>

                        <p className="text-sm text-[#5f5548]">
                            You explored multiple internship options. While each
                            option aligns with a different experience pattern,
                            comparing them side-by-side can help surface trade-offs
                            in workload, flexibility, and reputation.
                        </p>

                        <p className="text-xs text-[#7a7368] italic">
                            Comparative insights will be expanded here in future
                            versions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Insights;
