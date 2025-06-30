import { Percent, Star, TrendingUp } from "lucide-react";
import React from "react";

export default function SummaryCard({
  topic,
  amount,
  details,
  apy,
  icon,
  rating,
  active,
}: {
  apy?: string | number;
  topic: string;
  amount: string;
  details?: string;
  icon?: React.ReactNode;
  rating?: number;
  active?: number;
}) {
  const isNegative = typeof apy === "number" && apy < 0;

  const apyGrowth = () => {
    if (isNegative) {
      return `-${Math.abs(apy)}%`;
    }
    return `+${apy}%`;
  };

  return (
    <div className="w-full md:max-w-[400px] bg-white space-x-2 justify-between items-center shadow-md hover:scale-105 rounded-2xl p-4 flex   hover:shadow-lg transition">
      <div className="flex flex-col ">
        <h3 className="text-[16px] font-semibold text-[#686868]">{topic}</h3>
        <p className="text-[#1d1d1c] font-[600] text-[26px] text-start">
          {amount}
        </p>

        {apy && (
          <p
            className={`${
              isNegative ? "text-red-500" : "text-green-600"
            } text-start w-full text-[16px] flex space-x-2 font-[600]`}
          >
            <TrendingUp color={isNegative ? "red" : "green"} />
            <span>{apyGrowth()}</span>
          </p>
        )}
        {rating && (
          <p
            className={`${
              isNegative ? "text-red-500" : "text-green-600"
            } text-start w-full text-[16px] flex space-x-2 font-[600]`}
          >
            <Star color={"gold"} />
            <span>{rating} rating</span>
          </p>
        )}
        {details && (
          <p className="text-gray-500 text-sm text-start w-full text-[18px] font-[600]">
            {details}
          </p>
        )}
        {active && (
          <p className="text-gray-500 text-sm text-start w-full text-[18px] font-[600]">
            {active}
          </p>
        )}
      </div>
      <div className=" flex items-center justify-center">{icon}</div>
    </div>
  );
}
