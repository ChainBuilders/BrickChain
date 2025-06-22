"use client";

import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNave() {
  const pathname = usePathname();

  const navItems = [
    { label: "Portfolio", href: "/dashboard/portfolio", icon: "📊" },
    { label: "Properties", href: "/dashboard/properties", icon: "🏠" },
    { label: "Transactions", href: "/dashboard/transactions", icon: "🔄" },
    { label: "Staking", href: "/dashboard/staking", icon: "⚡" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="w-[250px] h-screen bg-[#6f5a0c] shadow-md flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
       
        <nav className="space-y-2 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center w-full text-[20px] text-white gap-2 px-3 py-2  text-sm transition ${
                  isActive
                    ? "bg-[#000000] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#000000]"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-white text-sm">© 2023 Your Company</div>
    </div>
  );
}
