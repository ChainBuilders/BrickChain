import { Activity, ChartColumn } from "lucide-react";
import React from "react";

interface PerformanceProps {
  user: string;
}

export default function Performance({ user }: PerformanceProps) {
  const duration = ["7D", "30D", "90D"];

  return (
    <div className="w-full flex flex-col shadow-lg rounded-lg bg-white">
      <div className="flex items-center justify-between p-[24px]">
        <h1 className="font-semibold tracking-tight text-xl">
          Portfolio Performernce
        </h1>
        <div className="flex items-center space-x-2">
          {duration.map((item, index) => (
            <button
              className={`border px-3 py-2 rounded-md ${
                user === "realtor"
                  ? "hover:bg-blue-600"
                  : "hover:bg-emerald-600"
              } border-[#b2b1b1] hover:text-white font-[600]`}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {user === "realtor" ? (
        <div className="w-full p-6 pt-0">
          <div className="h-64 bg-gradient-to-br text-center from-blue-50 to-cyan-50 </div>rounded-lg flex flex-col items-center justify-center">
            <ChartColumn color="blue" size={60} />
            <p className="text-lg text-slate-600">
              Commission performance chart
            </p>
            <p className="text-md text-slate-500">Showing earnings over 30d</p>
          </div>
        </div>
      ) : (
        <div className="w-full p-6 pt-0">
          <div className="h-64 bg-gradient-to-br text-center from-emerald-50 to-teal-50 </div>rounded-lg flex flex-col items-center justify-center">
            <Activity color="green" size={60} />
            <p className="text-lg text-slate-600">
              Portfolio performance chart would go here
            </p>
            <p className="text-md text-slate-500">Showing growth over 90d</p>
          </div>
        </div>
      )}
    </div>
  );
}
