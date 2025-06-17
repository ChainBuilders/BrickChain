import React from "react";
import Card from "../ui/Card";
import {
  Banknote,
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
      className=" bg-[white] "
      //   style={{
      //     backgroundImage: "url('/hero.jpg')",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //     height: "50vh",
      //   }}
    >
      <h1 className="text-[#0f6a09] text-[40px] font-[600] text-center pt-10">
        Real Estate Reinvented For Everyone
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 p-8 max-w-[1200px] mx-auto">
        <Card
          icon={<Banknote  color="#0f6a09" size={30}/>}
          title="High Costs"
          description="₦80M+ for a Lagos home? Not anymore."
        />
        <Card
          icon={<Hourglass color="#0f6a09" size={30}/>}
          title="No Liquidity"
          description="Sell your property shares in minutes, not months."
        />
        <Card
          icon={<FileText color="#0f6a09" size={30}/>}
          title="Zero Trust"
          description="Smart contracts replace paperwork. Transparent. Secure."
        />
      </div>
    </div>
  );
}
