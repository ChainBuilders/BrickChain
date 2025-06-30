import React from "react";
import Button from "../ui/Button";
import { ArrowRight, Gift, Users } from "lucide-react";

export default function Referral() {
  return (
    <section className="w-full py-24 px-2 md:px-5 lg:px-16 xl:px-[250px] h-full bg-[#eefbea]">
        <div className="w-full bg-gradient-to-r flex flex-col lg:flex-row h-fit from-[#33c199] shadow-[1px_12px_35px_rgb(0,0,0,0.3)] to-[#15986a] space-y-5 lg:space-y-0 min-h-[300px] rounded-md p-10  ">
          <div className="flex flex-col  space-y-4 ">
          <h1 className="text-[40px] flex-col items-start md:flex-row font-[600] text-white space-x-3 flex  md:items-center">
            <Gift color="white" size={60} />{" "}
            <span>Invite Friends and Earn Together</span>
          </h1>
          <h3 className="text-[23px] font-[500] text-white">
            <span>
              For each friend you refer who completes their first transaction,
              you'll earn ₦5,000.
            </span>
            <span>Dont Sleep on this Offer, You snooze you lose</span>
          </h3>
          <div className="w-full flex space-x-3 mt-5">
            <button className=" text-[18px] font-[600] text-green-700 flex space-x-2 px-15 rounded-lg py-4 bg-white hover:bg-black hover:text-white border-transparent cursor-pointer  hover:border-black border-2">
              <span>Share & Earn</span>
              <ArrowRight  color="#15986a" className="font-[600]"/>
            </button>
          </div>
          </div>

          <div className="justify-center min-h-[240px] items-center rounded-full flex flex-none max-w-[240px] w-full h-full bg-white/20">
            <Users size={120} color="white" />
          </div>
        </div>
    </section>
  );
}
