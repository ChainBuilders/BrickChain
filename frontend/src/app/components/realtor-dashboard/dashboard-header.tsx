import {
  ArrowUpRight,
  Building2,
  DollarSign,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

function RealtorWelcome() {
  const realtorStats = {
    totalListings: 12,
    activeListings: 8,
    totalCommissions: "₦2,450,000",
    monthlyCommissions: "₦185,000",
    totalInvestors: 156,
    averageRating: 4.8,
  };

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

        <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 rounded-md animate-in slide-in-from-left  delay-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Listings
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {realtorStats.totalListings}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {realtorStats.activeListings} active
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 rounded-md animate-in slide-in-from-left  delay-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Commissions
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {realtorStats.totalCommissions}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 font-medium">
                    +12.5%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 rounded-md animate-in slide-in-from-left  delay-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Monthly Commissions
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {realtorStats.monthlyCommissions}
                </p>
                <p className="text-sm text-slate-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 rounded-md animate-in slide-in-from-left  delay-400">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Investors
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {realtorStats.totalInvestors}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                  <span className="text-sm text-slate-600">
                    {realtorStats.averageRating} rating
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealtorWelcome;
