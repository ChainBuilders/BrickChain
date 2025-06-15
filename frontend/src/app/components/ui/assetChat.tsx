// components/AssetPieChart.tsx

"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0f6a09", "#877512", "#4b9e5d", "#348888", "#ff9900"];

export default function AssetPieChart({ assets }: { assets: { name: string; value: number }[] }) {
  return (
    <div className="w-full mx-auto ">
      <h2 className="text-xl font-bold mb-4 text-start text-[#0f6a09] text-center">
        Your Properties Distribution
      </h2>
      <PieChart width={470} height={430}>
        <Pie
          data={assets}
          cx="50%"
          cy="50%"
          label
          outerRadius={170}
          dataKey="value"
        >
          {assets.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
