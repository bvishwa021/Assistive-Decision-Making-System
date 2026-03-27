import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

const FEATURE_LABELS = {
    stipend: "Stipend",
    workload: "Workload",
    company_reputation: "Reputation",
    time_flexibility: "Flexibility",
};

function InternshipRadarChart({ values }) {
    const data = Object.entries(values).map(([key, val]) => ({
        feature: FEATURE_LABELS[key] || key,
        value: val,
    }));

    return (
        <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} outerRadius={60}>
                    <PolarGrid stroke="#e6d8c3" />
                    <PolarAngleAxis
                        dataKey="feature"
                        tick={{ fill: "#7a4a1d", fontSize: 11, fontWeight: 500 }}
                    />
                    <Radar
                        dataKey="value"
                        stroke="#FF9644"
                        fill="#FF9644"
                        fillOpacity={0.25}
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#FF9644", strokeWidth: 0 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default InternshipRadarChart;