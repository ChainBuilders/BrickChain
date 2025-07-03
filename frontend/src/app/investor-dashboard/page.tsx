"use client";
import { redirect } from "next/navigation";
import SummaryCard from "../../components/ui/summaryCard";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { properties } from "@/data/propertiesData";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import Performance from "../../components/dashboard/performance";
import Properties from "../../components/dashboard/properties";
import QuickAction from "../../components/dashboard/quickAction";
import RecentTransaction from "../../components/dashboard/recentTransaction";
import PortfolioAllocation from "../../components/dashboard/portfolioAllocation";
import { createSupabaseClient } from "@/auth/client";

interface RecentActivity {
  type: string;
  title: string;
  date: string;
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    user_type: "investor",
  });
  const supabase = createSupabaseClient();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("users")
          .select("full_name, user_type")
          .eq("id", user.id)
          .single();

        if (data) {
          setUserProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login");
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const displayName =
    userProfile.full_name || user.email?.split("@")[0] || "User";

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
            Welcome Back, {displayName}! 👋
          </h1>
          <p className="text-stone-500 text-lg font-[600]">
            Heres whats happening with your real estate portfolio today
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          topic={"Total Portfolio Value"}
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
          <Performance />
          <Properties propertyData={simplifiedProperties} />
        </div>
        <div className="space-y-6 w-full lg:w-auto gap-8">
          <QuickAction />
          <RecentTransaction data={recentActivities} />
          <PortfolioAllocation />
        </div>
      </div>
    </div>
  );
}
