import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Insights() {
    const location = useLocation();
    const navigate = useNavigate();

    const { individualResults, comparison_text } = location.state || {};

    if (!individualResults) {
        return (
            <>
            <Navbar />
            <div className="relative w-full px-10 py-5 space-y-10">
                <button
                    onClick={() => navigate("/input")}
                    className="absolute top-4 right-10 px-6 py-2 rounded-lg text-sm font-semibold bg-[#FF9644] text-[#562F00] hover:bg-[#fc9f58] transition"
                >
                    Go Back
                </button>
                <div className="min-h-screen bg-[#fffdf1] flex items-center justify-center">
                    <p className="text-[#7A4A1A] italic text-lg">
                        No insights available. Please submit expectations first.
                    </p>
                </div>
            </div>
            </>
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
                            key={index}
                            className="bg-white border border-[#efe6d8] rounded-xl p-5 space-y-4"
                        >
                            {/* Header */}
                            <div className="space-y-1">
                                <h2 className="text-lg font-medium text-[#562f00]">
                                    Internship {index + 1}: {result.internship_name}
                                </h2>
                                <span className="inline-block text-xs font-semibold text-[#7a4a1d] bg-[#fdf3e7] border border-[#f2e4cf] rounded-full px-3 py-1">
                                    {result.category}
                                </span>
                            </div>

                            {/* Same-cluster differentiator callout */}
                            {result.differentiator && (
                                <div className="flex items-start gap-2 bg-[#fdf3e7] border border-[#f2e4cf] rounded-lg px-3 py-2">
                                    <span className="text-[#c47c2b] text-sm mt-0.5">⚡</span>
                                    <p className="text-xs text-[#7a4a1d] leading-relaxed">
                                        {result.differentiator}
                                    </p>
                                </div>
                            )}

                            {/* Core description */}
                            <p className="text-sm text-[#5f5548] leading-relaxed">
                                {result.core}
                            </p>

                            {/* Highlights */}
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#7a4a1d]">
                                    What this offers
                                </p>
                                <ul className="space-y-1">
                                    {result.highlights.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[#5f5548]">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#c47c2b] shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tradeoffs */}
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#7a4a1d]">
                                    What you give up
                                </p>
                                <ul className="space-y-1">
                                    {result.tradeoffs.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[#5f5548]">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#a0522d] shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Reflection prompts */}
                            <div className="space-y-2 border-t border-[#efe6d8] pt-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#7a4a1d]">
                                    Reflect on this
                                </p>
                                <ul className="space-y-2">
                                    {result.reflection_prompts.map((prompt, i) => (
                                        <li key={i} className="text-sm text-[#6b6257] italic leading-relaxed">
                                            "{prompt}"
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contextual Comparison */}
                {comparison_text && (
                    <div className="max-w-5xl mx-auto bg-[#fffaf2] border border-[#f2e4cf] rounded-xl p-6 space-y-3">
                        <h2 className="text-lg font-medium text-[#562f00]">
                            Contextual Comparison
                        </h2>

                        <p className="text-sm text-[#5f5548] leading-relaxed">
                            {comparison_text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Insights;
