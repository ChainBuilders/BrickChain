// components/realtor-dashboard/Layout.tsx
import React from "react";
import RealtorWelcome from "./dashboard-header";
import Performance from "../dashboard/performance";
import PropertiesListings from "./properties-listings";
import QuickAction from "./actions-card";
import Activities from "./Activities";
import PerformanceSummary from "./PerformanceSummary";
import { User } from "@supabase/supabase-js";

interface RealtorLayoutProps {
  user: User;
}

function RealtorLayout({ user }: RealtorLayoutProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-8">
      <RealtorWelcome user={user} />
      <main className="lg:grid lg:grid-cols-3 space-y-8 lg:space-y-0 gap-8">
        <div className="lg:col-span-2 w-full space-y-8">
          <Performance />
          <PropertiesListings />
        </div>
        <div className="space-y-8">
          <QuickAction />
          <Activities />
          <PerformanceSummary />
        </div>
      </main>
    </div>
  );
}

export default RealtorLayout;