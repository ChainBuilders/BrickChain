"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "../ui/Button";
import { Building, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useModalStore } from "@/stores/modalStore";

export default function NavBar() {
  const onLoginModal = useModalStore((state) => state.onLoginPrompt);
  const [toggle, setToggle] = useState(false);
  const [toggleMiniDropdown, setToggleMiniDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading, signOut } = useAuth();

  const toggleMenu = () => setToggle(!toggle);
  const miniDropdowntoggle = () => setToggleMiniDropdown(!toggleMiniDropdown);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = user
    ? ["Home", "Properties", "Dashboard", "About", "Contact"]
    : ["Home", "Properties", "About", "Contact"];

  const walletAddress = user?.email
    ? `${user.email.substring(0, 3)}...${user.email.split("@")[1]}`
    : "Not connected";

  const getRoutePath = (item: string) => {
    if (item === "Home") return "/";
    if (item === "Dashboard") {
      return user?.user_metadata?.user_type === "realtor"
        ? "/realtor-dashboard"
        : "/investor-dashboard";
    }
    return `/${item.toLowerCase().replace(" ", "")}`;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Desktop Menu */}
      <div className="container mx-auto hidden md:flex justify-between items-center">
        <div className="flex space-x-2 pt-2 items-center">
          <span className="bg-gradient-to-r from-[#36a888]  to-[#21805f] p-1 h-fit rounded-lg ">
            <Building color="white" size={30} className="stroke-3" />
          </span>{" "}
          <div className="bg-gradient-to-r from-[#36a888] py-3 to-[#21805f] bg-clip-text text-transparent text-2xl font-bold">
            BrickChain
          </div>
        </div>

        <div className="space-x-3">
          {links.map((item, index) => {
            const path = getRoutePath(item);
            const isActive = pathname === path;

            return (
              <Link
                key={index}
                href={path}
                className={`px-3 py-1 text-lg font-[500] transition-colors ${
                  isActive
                    ? "border-b-2 border-[#21805f] text-[#21805f]"
                    : "text-stone-500 hover:text-[#21805f] border-b-2 border-transparent hover:border-black/50"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {!user ? (
          <div className="hidden md:flex space-x-3">
            <Button className="text-[#1A5D1A] hover:bg-[#e3e1e1]">
              Connect wallet
            </Button>
            <Button
              onClick={onLoginModal}
              className="bg-[#1A5D1A] text-white hover:bg-[#000000]"
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="space-x-3 items-center hidden md:flex flex-col relative">
            <Button
              onClick={miniDropdowntoggle}
              className="bg-[white] text-[green] hover:bg-[#a8a7a7] flex space-x-2"
            >
              <User color="green" size={23} className="stroke-[3]" />
            </Button>

            {toggleMiniDropdown && (
              <div className="flex flex-col gap-4 absolute bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg top-12 right-0 items-center justify-center min-w-[200px]">
                <span className="text-white font-medium">{walletAddress}</span>
                <Button
                  onClick={handleLogout}
                  className="bg-[white] text-[green] border hover:bg-[#a8a7a7] flex space-x-2"
                >
                  <LogOut color="green" size={20} className="stroke-[3]" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center justify-end p-2 sm:justify-between min-h-[55px] relative">
        <div className="bg-gradient-to-r hidden w-full sm:flex from-[#36a888] to-[#21805f] bg-clip-text text-transparent text-2xl font-bold">
          BrickChain
        </div>

        <button
          className="text-gray-600 absolute top-2 right-3 hover:text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {toggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ee2020"
              stroke="#ee2020"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {toggle && (
          <div className="w-full flex flex-col items-center mt-4">
            <div className="flex flex-col items-start w-full mt-6">
              {links.map((item, index) => {
                const path = getRoutePath(item);
                const isActive = pathname === path;

                return (
                  <Link
                    key={index}
                    href={path}
                    onClick={() => setToggle(false)}
                    className={`block px-3 py-1 text-lg font-[500] w-full transition-colors ${
                      isActive
                        ? "border-b-2 border-[#21805f] text-[#21805f]"
                        : "text-stone-500 hover:text-[#21805f] border-b-2 border-transparent hover:border-black/50"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-between w-full mt-4">
              {!user ? (
                <div className="flex md:justify-end justify-between items-center w-full">
                  <Button className="bg-[white] border hover:bg-[#e6e6e6] text-[#1A5D1A] text-sm">
                    Connect wallet
                  </Button>
                  <Button
                    onClick={onLoginModal}
                    className="bg-[white] border hover:bg-[#e6e6e6] text-[#1A5D1A] text-sm"
                  >
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg items-center justify-center w-full">
                  <span className="text-white font-[600]">{walletAddress}</span>
                  <Button
                    onClick={handleLogout}
                    className="bg-[white] text-[green] border hover:bg-[#a8a7a7] flex space-x-2"
                  >
                    <LogOut color="green" size={20} className="stroke-[3]" />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
