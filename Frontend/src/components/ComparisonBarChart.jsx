import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const FEATURE_LABELS = {
    stipend: "Stipend",
    workload: "Workload",
    company_reputation: "Reputation",
    time_flexibility: "Flexibility",
};

// Distinct warm palette for up to 4 internships
const COLORS = ["#FF9644", "#562f00", "#c47c2b", "#a0522d"];

function ComparisonBarChart({ results }) {
    // Build one row per feature, with each internship as a column
    const data = Object.keys(FEATURE_LABELS).map((key) => {
        const row = { feature: FEATURE_LABELS[key] };
        results.forEach((result) => {
            row[result.internship_name] = result.values[key];
        });
        return row;
    });

    const internshipNames = results.map((r) => r.internship_name);

    return (
        <div className="w-full h-85">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 4, right: 24, left: 16, bottom: 4 }}
                    barCategoryGap="25%"
                    barGap={3}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#e6d8c3"
                    />
                    <XAxis
                        type="number"
                        domain={[0, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={{ fill: "#7a4a1d", fontSize: 11 }}
                        axisLine={{ stroke: "#e6d8c3" }}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="feature"
                        tick={{ fill: "#562f00", fontSize: 12, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "#FFFDF1",
                            border: "1px solid #e6d8c3",
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: "#562f00",
                        }}
                        cursor={{ fill: "#fdf3e7" }}
                    />
                    <Legend
                        wrapperStyle={{ fontSize: "12px", color: "#5f5548", paddingTop: "8px" }}
                    />
                    {internshipNames.map((name, i) => (
                        <Bar
                            key={name}
                            dataKey={name}
                            fill={COLORS[i % COLORS.length]}
                            radius={[0, 4, 4, 0]}
                            maxBarSize={32}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ComparisonBarChart;