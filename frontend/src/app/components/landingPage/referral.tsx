import React from "react";
import Button from "../ui/Button";
import { Gift } from "lucide-react";

export default function Referral() {
  return (
    <section className="w-full p-10 bg-white">
      <div className="w-full bg-[#0f6a09] max-h-[400px] min-h-[300px] rounded-3xl p-5 relative ">
        <h1 className="text-[40px] font-[600] text-white">
          Invite Friends and Family and earn with BrickChain
        </h1>
        <h3 className="text-[20px] font-[500] text-white">
          For each friend you refer who completes their first transaction,
          you'll earn ₦5,000. Dont Sleep on this Offer, You snooze you lose
        </h3>
        <div className="w-full md:w-3/5 flex justify-end">
          <Button
            link="/referral"
            className="w-[200px] bg-[#877512] hover:bg-[#6f5a0c] mt-4"
          >
            Share & Earn
          </Button>
        </div>
        <span className="absolute top-3 right-2 w-fit">
          <Gift color="white" size={150} />
        </span>
      </div>
    </section>
  );
}
