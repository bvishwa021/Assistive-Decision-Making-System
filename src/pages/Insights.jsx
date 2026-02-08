import { useLocation, useNavigate } from "react-router-dom";
import InputForm from "./InputForm";
import Navbar from "../components/Navbar";

function Insights() {
    const location = useLocation();
    const navigate = useNavigate();

    const { individualResults, comparative } = location.state || {};

    if (!individualResults) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">
                    No insights available. Please submit expectations first.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
                <h1 className="text-2xl font-semibold">Internship Insights</h1>

                {/* Individual Insight Cards */}
                <div className="space-y-6">
                    {individualResults.map((result, index) => (
                        <div
                            key={result.id}
                            className="bg-white rounded-xl shadow-sm p-6 space-y-4"
                        >
                            <h2 className="text-lg font-medium">
                                Internship {index + 1}
                            </h2>

                            <p className="text-gray-700">
                                This internship aligns most closely with{" "}
                                <span className="font-semibold">
                                    Cluster {result.clusterId}
                                </span>
                                .
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                                {Object.entries(result.inputs).map(
                                    ([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="capitalize">
                                                {key.replace("_", " ")}
                                            </span>
                                            <span>{value}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparative Insight Card */}
                {comparative && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
                        <h2 className="text-lg font-medium">
                            Contextual Comparison
                        </h2>

                        <p className="text-gray-700">
                            You explored multiple internship options. While each
                            option aligns with a different experience pattern,
                            comparing them side-by-side can help surface trade-offs
                            in workload, flexibility, and reputation.
                        </p>

                        <p className="text-sm text-gray-600 italic">
                            Comparative insights will be expanded here in future
                            versions.
                        </p>
                    </div>
                )}
                <div className="pt-4">
                    <button
                        onClick={() => navigate("/input")}
                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Insights;
