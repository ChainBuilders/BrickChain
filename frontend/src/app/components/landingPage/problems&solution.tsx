import React from "react";
import Card from "../ui/Card";
import {
  DollarSign,
  Link,
  Hourglass,
  Zap,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function ProblemsAndSolution() {
//   const cardData = [
//     {
//       title: "High Costs",
//       description: "₦80M+ for a Lagos home? Not anymore.",
//       icon: "₦ → 🔗",
//     },
//     {
//       title: "No Liquidity",
//       description: "Sell your property shares in minutes, not months.",
//       icon: "<BankNote size={30}> → 💨",
//     },
//     {
//       title: "Zero Trust",
//       description: "Smart contracts replace paperwork. Transparent. Secure.",
//       icon: "📜 → 🔒",
//     },
//   ];

  return (
    <div
      className=" bg-[#ffffff]  pt-10 pb-15">
     
      <h1 className="text-black text-[40px] font-[600] text-center pt-10">
        Real Estate Reinvented For Everyone
      </h1>
        <p className="text-stone-500 text-2xl font-[500] text-center">Traditional Real Estate barriers eliminated through blockchain innovation</p>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8  py-8 px-2 md:px-20 w-full">
        <Card
          icon={<DollarSign  color="white" size={30}/>}
          title="No High Costs"
          color="#ff5546"
          description="Start investing with just ₦10,000.No need for millions to own premium real estate."
        />
        <Card
          icon={<Zap color="white" size={30}/>}
          title="Instant Liquidity"
          color="#4696ff"
          description="Trade your property token anytime on our marketplace. No waiting months to sell."
        />
        <Card
          icon={<ShieldCheck color="white" size={30}/>}
          title="Complete Trust"
          color="#25f475bb"
          description="Smart contracts ensures Transparency. All transaction are Secure and verifiable on the blockchain."
        />
      </div>
    </div>
  );
}
