import React from "react";

export default function PropertiesStatistic() {
  return (
    <div className="rounded-lg bg-white text-card-foreground border-0 shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-lg">
          Property Statistics
        </div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-600">Property Type</span>
          <span className="font-semibold">Residential Duplex</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Year Built</span>
          <span className="font-semibold">2021</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Monthly Rent</span>
          <span className="font-semibold text-emerald-600">₦850,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Occupancy Rate</span>
          <span className="font-semibold">95%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Token Price</span>
          <span className="font-semibold">₦500</span>
        </div>
      </div>
    </div>
  );
}
