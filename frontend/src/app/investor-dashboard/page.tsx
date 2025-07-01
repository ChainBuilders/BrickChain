import { redirect } from "next/navigation";
import SummaryCard from "../../components/ui/summaryCard";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { myProperties } from "@/data/myProperties";
import { properties } from "@/data/propertiesData";
import Image from "next/image";
import Performance from "../../components/dashboard/performance";
import Properties from "../../components/dashboard/properties";
import QuickAction from "../../components/dashboard/quickAction";
import RecentTransaction from "../../components/dashboard/recentTransaction";
import PortfolioAllocation from "../../components/dashboard/portfolioAllocation";
import InvestmentGoalCard from "../../components/dashboard/investmentGoal";

export default function Dashboard() {
  const user = { name: "tali", state: "realtor" };

  const ownershipPercent = myProperties.map(
    (property) => property.ownershipPercent
  );

  interface RecentActivity {
    type: string;
    title: string;
    date: string;
  }

  const recentActivities: RecentActivity[] = [
    {
      type: "New client inquiry",
      title: "Lagos Luxury Duplex by Adebayo O.",
      date: "2024-01-25",
    },
    {
      type: "Property listing approved",
      title: "Abuja Modern Apartments",
      date: "2024-01-24",
    },
    {
      type: "Commission payment received",
      title: "N5,000",
      date: "2024-01-23",
    },
  ];

  const property = properties.map((properties) => properties);

  const simplifiedProperties = property.map((p) => ({
    id: p.id,
    name: p.name,
    location: p.location,
    status: p.status,
    image: p.images[0],
    invested: p.financials.purchasePrice,
    currentValue: p.totalValue,
    monthlyIncome: p.financials.monthlyIncome,
    change: 8.5,
    tokensOwned: `${p.totalTokens - p.availableTokens}`,
    ownershipPercent: Math.round(
      ((p.totalTokens - p.availableTokens) / p.totalTokens) * 100
    ),
  }));


  return (
    <div className="w-full  flex flex-col gap-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4  ">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-[35px] font-[600]">
            Welcome Back, {user.name}! 👋
          </h1>
          <p className="text-stone-500 text-lg font-[600]">
            Heres whats happening with your real estate portfolio today
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
            topic={ "Total Portfolio Value"}
            amount="₦1,000,000"
            apy={16.67 }
            icon={
              <span className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ">
                {" "}
                <TrendingUp color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic={"Total Invested"}
            amount="₦2,100,000"
            
            details={"Across 8 Properties"}
            icon={
              <span className="p-4 rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center ">
                {" "}
                <Wallet color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
         <SummaryCard
            topic={"Monthly Income"}
            amount="₦45,000"
            details={"From rental yields"}
            icon={
              <span className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ">
                {" "}
                <DollarSign color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic={"Total Returns"}
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
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col w-full gap-8">
          {/* src/app/components */}
          <Performance />

          <Properties propertyData={simplifiedProperties}  />
        </div>
        <div className="space-y-6 w-full lg:w-auto gap-8">
          <QuickAction />
          {/* for realtor is recent activities */}
          <RecentTransaction data={recentActivities} />

          {/* portfolio allocation as bussiness matrix on realtor dashboard */}
          <PortfolioAllocation />

          {/* hides when on realtors dashboard */}
          <div className={`${user.state === "realtor" ? "hidden" : "block"}`}>
            <InvestmentGoalCard />
          </div>
        </div>
      </div>
    </div>
  );
}
