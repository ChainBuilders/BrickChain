import { redirect } from "next/navigation";
import SummaryCard from "../components/ui/summaryCard";
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Download,
  Eye,
  MapPin,
  Plus,
  TrendingUp,
  Wallet,
  Clock3,
} from "lucide-react";
import { listings } from "@/data/listing";
import {
  myProperties,
  recentTransactions,
  portfolioAllocation,
} from "@/data/myProperties";
import Image from "next/image";
import Performance from "../components/dashboard/performance";
import Properties from "../components/dashboard/properties";
import QuickAction from "../components/dashboard/quickAction";
import RecentTransaction from "../components/dashboard/recentTransaction";
import PortfolioAllocation from "../components/dashboard/portfolioAllocation";

export default function Dashboard() {
  const user = "Tali";

  const ownershipPercent = myProperties.map(
    (property) => property.ownershipPercent
  );

  return (
    <div className="w-full flex flex-col gap-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 xl:px-32">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-[35px] font-[600]">Welcome Back, {user}! 👋</h1>
          <p className="text-stone-500 text-lg font-[600]">
            Heres whats happening with your real estate portfolio today
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex flex-col justify-center items-center xl:flex-row gap-4 w-full">
          <SummaryCard
            topic="Total Portfolio Value"
            amount="₦1,000,000"
            apy={16.67}
            icon={
              <span className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ">
                {" "}
                <TrendingUp color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic="Total Invested"
            amount="₦2,100,000"
            details="Across 8 Properties"
            icon={
              <span className="p-4 rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center ">
                {" "}
                <Wallet color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
        </div>
        <div className="flex flex-col justify-center items-center xl:flex-row gap-4 w-full">
          <SummaryCard
            topic="Monthly Income"
            amount="₦45,000"
            details="From rental yields"
            icon={
              <span className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ">
                {" "}
                <DollarSign color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic="Total Returns"
            amount="₦350,000"
            apy={16.67}
            icon={
              <span className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center ">
                {" "}
                <TrendingUp color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 bw-full">
        <div className="flex flex-col w-full gap-8">
          <Performance />
          <Properties />
        </div>
        <div className="space-y-6 w-full lg:w-auto gap-8">
          <QuickAction />
          <RecentTransaction />
          <PortfolioAllocation />
        </div>
      </div>
    </div>
  );
}
