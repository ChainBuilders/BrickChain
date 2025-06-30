import { portfolioAllocation ,businessMetrics  } from "@/data/myProperties";
import { Clock3 } from "lucide-react";
import React from "react";

interface PortfolioAllocationProps {
  user: string;
}

export default function PortfolioAllocation({
  user,
}: PortfolioAllocationProps) {
  const isRealtor = user === "realtor";

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold tracking-tight text-lg">
          Business metrics
        </h1>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {isRealtor ? (
            businessMetrics &&
            businessMetrics.map((matrix, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <p className="text-md text-slate-600">{matrix.metric}</p>
                </div>
                <div className="text-right">
                  <p className="text-md font-bold text-slate-900">
                    {matrix.value}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              {portfolioAllocation &&
                portfolioAllocation.map((allocation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`p-2 rounded-full ${allocation.color}`}
                      ></span>
                      <p className="text-md text-slate-600">
                        {allocation.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-bold text-slate-900">
                        {allocation.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              <div className="mt-4 h-32 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center flex items-center flex-col justify-center">
                  <Clock3 size={34} color="gray" />
                  <p className="text-slate-500">Allocation chart</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
