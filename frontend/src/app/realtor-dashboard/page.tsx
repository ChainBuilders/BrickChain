// app/realtor-dashboard/page.tsx
"use client";

import React from "react";
import RealtorLayout from "../../components/realtor-dashboard/Layout";
import { createSupabaseClient } from "@/auth/client";
import { User } from "@supabase/supabase-js";

export default function RealtorDashboard() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      const supabase = createSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect or show unauthorized message
    return <div>Unauthorized access</div>;
  }

  return <RealtorLayout user={user} />;
}