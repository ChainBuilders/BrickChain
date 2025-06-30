import {
  CalendarClock,
  DollarSign,
  Goal,
  ShieldCheck,
} from "lucide-react";
import React from "react";

interface InvestmentGoalCardProps {
  user: string; 
}

export default function InvestmentGoalCard({ user }: InvestmentGoalCardProps) {
  const values: string[] = ["₦5,000,000", "₦100,000", "Moderate", "3-5 Years"];

  return (
    <div className="rounded-lg bg-white  text-card-foreground border-0 shadow-lg animate-in slide-in-from-right duration-700 delay-400">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-lg">Investment Goals</div>
      </div>
      <div className="p-6 pt-0 space-y-3">
        <div className="flex items-center space-x-2">
          <Goal color="green" />
          <div>
            <p className=" font-medium text-slate-600">Target Portfolio Value</p>
            <p className="text-lg font-semibold text-slate-900">{values[0]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign color="blue" />
          <div>
            <p className=" font-medium text-slate-600">Monthly Investment Goal</p>
            <p className="text-lg font-semibold text-slate-900">{values[1]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ShieldCheck color="purple"/>
          <div>
            <p className=" font-medium text-slate-600">Risk Tolerance</p>
            <p className="text-lg font-semibold text-slate-900">{values[2]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarClock color="orange" />
          <div>
            <p className=" font-medium text-slate-600">Investment Timeline</p>
            <p className="text-lg font-semibold text-slate-900">{values[3]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
