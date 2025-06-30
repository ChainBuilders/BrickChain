
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

"use client";

import { cn } from "@/libs/utils";
import { BarChart3 } from "lucide-react";
import React, { useState } from "react";

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7d");

  return (
    <div>
      <div className="border-0 shadow-lg p-6 rounded-md animate-in bg-white slide-in-from-bottom duration-700 delay-200">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Commission Performance</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedPeriod("7d")}
                className={cn(
                  "border px-3 py-2 transition-all duration-300 rounded-md border-[#b2b1b1] font-[600]",
                  selectedPeriod === "7d" ? "bg-gradient-to-r text-white from-emerald-500 to-teal-600 hover:teal-700" : ""
                )}
              >
                7D
              </button>
              <button
                onClick={() => setSelectedPeriod("30d")}
                className={cn(
                  "border px-3 py-2 rounded-md transition-all duration-300 border-[#b2b1b1] font-[600]",
                  selectedPeriod === "30d"
                    ? "bg-gradient-to-r text-white from-emerald-500 to-teal-600 hover:teal-700"
                    : ""
                )}
              >
                30D
              </button>
              <button
                onClick={() => setSelectedPeriod("90d")}
                className={cn(
                  "border px-3 py-2 rounded-md transition-all duration-300 border-[#b2b1b1] font-[600]",
                  selectedPeriod === "90d"
                    ? "bg-gradient-to-r text-white from-emerald-500 to-teal-600 hover:teal-700"
                    : ""
                )}
              >
                90D
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-slate-600">Commission performance chart</p>
              <p className="text-sm text-slate-500">
                Showing earnings over {selectedPeriod}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
