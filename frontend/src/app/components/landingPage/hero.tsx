import React from "react";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div
      className={
        "bg-[#1C5C4F] w-full py-20 flex flex-col space-y-4 items-center justify-center"
      }
    >
      <h1 className="md:text-[75px] text-[35px] md:leading-[70px] leading-9 font-[700] flex px-3  flex-col items-center justify-center">
        <span className="text-white">Own a Piece Of Nigerian's</span>
        <span className="bg-gradient-to-r from-[#47d9b0] to-[#33e2a5] bg-clip-text text-transparent">
          Premium Real Estate
        </span>
      </h1>

      <p className="text-white text-[18px] md:text-[25px] mt-4 max-w-[700px] text-center">
        Invest in Lagos, Abuja and Enugu Properties with as little as{" "}
        <strong className="text-[#47d9b0]">₦10,000</strong>, tokenize, trade,
        and earn yeild all on blockChain
      </p>
      <div className="mt-8 flex flex-col md:flex-row items-center  space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <Button className="bg-gradient-to-r hover:cursor-pointer from-[#34b792] w-[180px] to-[#328b79] lg:h-[60px] text-white lg:w-[220px] text-[20px] rounded-sm justify-center flex items-center space-x-2">
          <p>Get Started</p>
          <ArrowRight color="white" size={20} />
        </Button>
        <Button className="bg-white hover:cursor-pointer lg:h-[60px] w-[180px] lg:w-[220px] text-[20px] justify-center rounded-sm flex items-center space-x-2">
          <p className="text-[#1C5C4F]">Learn More</p>
          <ArrowRight color="#1C5C4F" size={20} />
        </Button>
      </div>
      <div className="w-full max-w-[650px] flex justify-between flex-col md:flex-row gap-4 mt-8">
        <div className="flex flex-col items-center ">
          <h1 className="text-[35px] bg-gradient-to-r from-[#47d9b0] to-[#33e2a5] bg-clip-text text-transparent font-[600]">
            ₦2.5B+
          </h1>
          <p className="text-white text-sm">Total Value Locked</p>
        </div>
        <div className="flex flex-col items-center ">
          <h1 className="text-[35px] bg-gradient-to-r from-[#47d9b0] to-[#33e2a5] bg-clip-text text-transparent font-[600]">
            ₦15,000+
          </h1>
          <p className="text-white text-sm">Active investors</p>
        </div>
        <div className="flex flex-col items-center ">
          <h1 className="text-[35px] bg-gradient-to-r from-[#47d9b0] to-[#33e2a5] bg-clip-text text-transparent font-[600]">
            ₦8.5%
          </h1>
          <p className="text-white text-sm">Average APY</p>
        </div>
      </div>
    </div>
  );
}
