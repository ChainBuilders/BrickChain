import React from "react";

export default function Financial() {
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-«ra»-trigger-financials"
      id="radix-«ra»-content-financials"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-6"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900">Financial Overview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-card text-card-foreground shadow-sm border border-slate-200">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="font-semibold tracking-tight text-lg">
                Investment Details
              </div>
            </div>
            <div className="p-6 pt-0 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Purchase Price</span>
                <span className="font-semibold">₦75,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Renovation Cost</span>
                <span className="font-semibold">₦5,000,000</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total Investment</span>
                <span className="font-bold text-slate-900">₦80,000,000</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-card text-card-foreground shadow-sm border border-slate-200">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="font-semibold tracking-tight text-lg">
                Monthly Income
              </div>
            </div>
            <div className="p-6 pt-0 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Rental Income</span>
                <span className="font-semibold text-emerald-600">₦850,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expenses</span>
                <span className="font-semibold text-red-600">-₦125,000</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Net Income</span>
                <span className="font-bold text-emerald-600">₦725,000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg text-card-foreground shadow-sm border border-emerald-200 bg-emerald-50">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Expected Annual Return
                </h4>
                <p className="text-slate-600">
                  Based on current rental income and occupancy rate
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">8.5%</div>
                <div className="text-slate-600">APY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
