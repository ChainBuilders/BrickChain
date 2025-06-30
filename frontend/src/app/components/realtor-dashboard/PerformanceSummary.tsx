import React from "react";

function PerformanceSummary() {
  return (
    <div className="border-0 bg-white p-6 rounded-md shadow-lg animate-in slide-in-from-right duration-700 delay-300">
      <div>
        <h1 className="text-2xl font-semibold mb-5">This Month</h1>
      </div>
      <div>
        <div className="space-y-4 text-[18px] font-medium">
          <div className="flex justify-between">
            <span className="text-slate-600">Properties Listed</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between ">
            <span className="text-slate-600">Total Investments</span>
            <span className="font-semibold">₦2.1M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Commission Earned</span>
            <span className="font-semibold text-emerald-600">₦185K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">New Investors</span>
            <span className="font-semibold">23</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceSummary;
