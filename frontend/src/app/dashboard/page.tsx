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
import { properties } from "@/data/propertiesData";
import Image from "next/image";
import Performance from "../components/dashboard/performance";
import Properties from "../components/dashboard/properties";
import QuickAction from "../components/dashboard/quickAction";
import RecentTransaction from "../components/dashboard/recentTransaction";
import PortfolioAllocation from "../components/dashboard/portfolioAllocation";
import InvestmentGoalCard from "../components/dashboard/investmentGoal";

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

  const property = properties.map(properties => properties)

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
  ownershipPercent: Math.round(((p.totalTokens - p.availableTokens) / p.totalTokens) * 100),
}));


  const isRealtor = user.state === "realtor";

  return (
    <div className="w-full flex flex-col gap-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 xl:px-[230px]">
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
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex flex-col justify-center items-center xl:flex-row gap-4 w-full">
          <SummaryCard
            topic={isRealtor ? "Total Listings" : "Total Portfolio Value"}
            amount="₦1,000,000"
            apy={!isRealtor? 16.67 : ""}
            active={isRealtor ? 5 : undefined}
            icon={
              <span className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ">
                {" "}
                <TrendingUp color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic={isRealtor ? "Total Commissions" : "Total Invested"}
            amount="₦2,100,000"
            apy={isRealtor ? 16.5 : undefined}
            details={!isRealtor ? "Across 8 Properties" : undefined}
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
            topic={isRealtor ? "Montly Investment" : "Monthly Income"}
            amount="₦45,000"
            details={isRealtor? "This Month":"From rental yields"}
            icon={
              <span className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ">
                {" "}
                <DollarSign color="white" size={30} className="stroke-[3]" />
              </span>
            }
          />
          <SummaryCard
            topic={isRealtor ? "Total Investment" : "Total Returns"}
            amount="₦350,000"
            apy={!isRealtor? 16.67 : ""}
            rating={isRealtor? 4.7: undefined}
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
          <Performance user={user.state} />
          <Properties propertyData={simplifiedProperties} user={user.state}/>
        </div>
        <div className="space-y-6 w-full lg:w-auto gap-8">
          <QuickAction user={user.state} />
          {/* for realtor is recent activities */}
          <RecentTransaction user={user.state} data={recentActivities} />

          {/* portfolio allocation as bussiness matrix on realtor dashboard */}
          <PortfolioAllocation user={user.state} />

          {/* hides when on realtors dashboard */}
          <div className={`${user.state === "realtor" ? "hidden" : "block"}`}>
            <InvestmentGoalCard user="realtor" />
          </div>
        </div>
      </div>
    </div>
  );
}
