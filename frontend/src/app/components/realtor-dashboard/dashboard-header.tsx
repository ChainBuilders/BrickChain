import {
  Building,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

function RealtorWelcome() {

  const stats = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2 this month",
      icon: Building,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Value",
      value: "₦850M",
      change: "+15% this quarter",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Active Investors",
      value: "1,247",
      change: "+89 this week",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. ROI",
      value: "8.5%",
      change: "+0.3% vs last month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div>
      <div className="mb-8 animate-in fade-in duration-700">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, Tali
        </h1>
        <p className="text-slate-600">
          Manage your property listings, track commissions, and grow your
          business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       

        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 rounded-md animate-in slide-in-from-left  delay-400"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[17px] font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-emerald-600">{stat.change}</p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RealtorWelcome;
