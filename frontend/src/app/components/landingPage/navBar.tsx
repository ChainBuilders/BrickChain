"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { User } from "lucide-react";

export default function NavBar() {
  const [toggle, setToggle] = React.useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const pathname = usePathname();

  const isLoggedIn = true;

  const links = isLoggedIn
    ? ["Home", "Properties", "Dashboard", "About", "Contact"]
    : ["Home", "Properties", "About", "Contact"];

  const walletAddress = "0x123..5678";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Desktop Menu */}
      <div className="container mx-auto hidden md:flex justify-between items-center">
        <div className="bg-gradient-to-r from-[#36a888] py-3 to-[#21805f] bg-clip-text text-transparent text-2xl font-bold">
          BrickChain
        </div>

        <div className=" space-x-3 ">
          {links.map((item, index) => {
            const path =
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
            const isActive = pathname === path;

            return (
              <Link
                key={index}
                href={path}
                className={`px-3 py-1 text-lg font-[500] transition-colors ${
                  isActive
                    ? "border-b-2   -[#21805f] text-[#21805f]"
                    : "text-stone-500  hover:text-[#21805f] border-b-2 border-transparent hover:border-black/50"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {!isLoggedIn ? (
          <div className="hidden md:flex space-x-3">
            <Button className="text-[#1A5D1A] hover:bg-[#e3e1e1]">
              Connect wallet
            </Button>
            <Button className="bg-[#1A5D1A] text-white hover:bg-[#000000]">
              Get Started
            </Button>
          </div>
        ) : (
          <div className=" space-x-3 items-center hidden md:flex">
            <Button className="bg-[white] text-[green] hover:bg-[#a8a7a7] flex space-x-2 ">
              {" "}
              <User color="green" size={23} className="stroke-[3]" />{" "}
              <span>{walletAddress}</span>
            </Button>
          </div>
        )}
      </div>

      {/* // Mobile Menu */}
      <div className="md:hidden flex items-center justify-end p-2 sm:justify-between min-h-[55px]   relative">
        <div className="bg-gradient-to-r hidden w-full  sm:flex from-[#36a888] to-[#21805f] bg-clip-text text-transparent text-2xl font-bold">
          BrickChain
        </div>
        {toggle ? (
          <button className="text-gray-600 absolute top-2 right-3 hover:text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          >
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
              className="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        ) : (
          <button
            className="text-gray-600 absolute top-2 right-3 hover:text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
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
          </button>
        )}

        <div className={`w-full  flex flex-col items-center mt-4" ${toggle ? "block" : "hidden"}`}>
          <div className="flex  flex-col items-start w-full mt-6">
            {links.map((item, index) => {
              const path =
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "")}`;
              const isActive = pathname === path;

              return (
                <Link
                  key={index}
                  href={path}
                  className={`block px-3 py-1 text-lg font-[500] w-full transition-colors ${
                    isActive
                      ? "border-b-2 border-[#21805f] text-[#21805f]"
                      : "text-stone-500  hover:text-[#21805f] border-b-2 border-transparent hover:border-black/50"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between w-full mt-4">
            {!isLoggedIn ? (
              <div className="flex md:justify-end justify-between items-center w-full ">
                <Button className="bg-[white] border hover:bg-[#e6e6e6] text-[#1A5D1A] text-sm">
                  Connect wallet
                </Button>
                <Button className="bg-[white] border hover:bg-[#e6e6e6] text-[#1A5D1A] text-sm">
                  Get Started
                </Button>
              </div>
            ) : (
              <Button className="bg-[white] text-[green] hover:bg-[#a8a7a7] flex space-x-2">
                <User color="green" size={23} className="stroke-[3]" />
                <span>{walletAddress}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
