"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import {LogOut} from "lucide-react"

export default function NavBar() {
  const pathname = usePathname();

  const isLoggedIn = true;

  const links = isLoggedIn
    ? ["Home", "Properties", "Dashboard","About", "Contact"]
    : ["Home", "Properties", "About", "Contact"];

  return (
    <nav className="bg-[#0f6a09] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">BrickChain</div>

        <div className="flex space-x-3">
          {links.map((item, index) => {
            const path =
              item === "Home"
                ? "/"
                : `/${item.toLowerCase().replace(" ", "")}`; // For safety
            const isActive = pathname === path;

            return (
              <Link
                key={index}
                href={path}
                className={`px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? "bg-[#c6f8c2] text-[#0f6a09]"
                    : "text-white hover:text-[#c6f8c2]"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {!isLoggedIn? (
          <div className="hidden md:flex space-x-3">
            <Button className="bg-[#877512] hover:bg-[#6f5a0c]">Login</Button>
            <Button className="bg-[#877512] hover:bg-[#6f5a0c]">Sign Up</Button>
          </div>
        ): (
          <div className="flex space-x-3 items-center">
            
            <Button  className="bg-[#877512] hover:bg-[#6f5a0c] flex space-x-2 "><span>Log out</span> <LogOut color="white" size={23} /></Button>
          </div>

        )}
      </div>
    </nav>
  );
}
