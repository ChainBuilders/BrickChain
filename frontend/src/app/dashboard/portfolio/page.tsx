import AssetPieChart from "@/app/components/ui/assetChat";
import SummaryCard from "@/app/components/ui/summaryCard";
import React from "react";

export default function Portfolio() {
  const summaryData = [
    {
      title: "Total Investment Value",
      value: "₦4,200,000",
      trend: { direction: "up", percent: 2.3, period: "7d" },
    },
    {
      title: "Staked Tokens",
      value: "50,000 staked",
      apy: "5% APY",
      yearlyValue: "₦250,000/yr",
    },
    {
      title: "Liquid Tokens",
      value: "10,000 tokens",
      note: "ready to trade/stake",
    },
  ];

  const assetData = [
    { name: "Lagos", value: 30 },
    { name: "Abuja", value: 30 },
    { name: "Enugu", value: 10 },
    { name: "Kaduna", value: 10 },
    { name: "Plateau", value: 20 },
  ];

  const transactions = [
    {
      action: "Bought",
      amount: "₦100,000",
      location: "Lagos",
      date: "2023-10-01",
      status: "Completed",
      statusClass: "text-green-600",
    },
    {
      action: "Staked",
      amount: "₦50,000",
      location: "Abuja",
      date: "2023-09-28",
      status: "Pending",
      statusClass: "text-yellow-600",
    },
    {
      action: "Sold",
      amount: "₦80,000",
      location: "Enugu",
      date: "2023-09-20",
      status: "Completed",
      statusClass: "text-green-600",
    },
    {
      action: "Bought",
      amount: "₦120,000",
      location: "Kaduna",
      date: "2023-09-15",
      status: "Failed",
      statusClass: "text-red-600",
    },
    {
      action: "Staked",
      amount: "₦60,000",
      location: "Plateau",
      date: "2023-09-10",
      status: "Completed",
      statusClass: "text-green-600",
    },
    {
      action: "Sold",
      amount: "₦90,000",
      location: "Lagos",
      date: "2023-09-05",
      status: "Completed",
      statusClass: "text-green-600",
    },
    {
      action: "Bought",
      amount: "₦110,000",
      location: "Abuja",
      date: "2023-08-30",
      status: "Pending",
      statusClass: "text-yellow-600",
    },
    {
      action: "Staked",
      amount: "₦70,000",
      location: "Enugu",
      date: "2023-08-25",
      status: "Completed",
      statusClass: "text-green-600",
    },
    {
      action: "Sold",
      amount: "₦95,000",
      location: "Kaduna",
      date: "2023-08-20",
      status: "Failed",
      statusClass: "text-red-600",
    },
    {
      action: "Bought",
      amount: "₦130,000",
      location: "Plateau",
      date: "2023-08-15",
      status: "Completed",
      statusClass: "text-green-600",
    },
  ];
  return (
    <div>
      <div className="flex justify-between lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4 p-6">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            topic={item.title}
            amount={item.value}
            duration={
              item.trend
                ? `${item.trend.percent}% ${item.trend.direction} (${item.trend.period})`
                : item.apy
                ? `${item.apy} (${item.yearlyValue})`
                : item.note || ""
            }
          />
        ))}
      </div>
      <div className="flex w-full mt-5">
        <AssetPieChart assets={assetData} />
        <div className="w-full   ">
          <h1 className="text-[20px] font-[600] text-[#0f6a09]">Recent Transaction</h1>
          <div className="max-h-[450px]  overflow-y-scroll">
          <table className="w-full mt-4 border-collapse ">
            <thead className="bg-[#0f6a09] text-white"  >
              <th className="py-1 text-start pl-2">Action</th>
              <th className="py-1 text-start pl-2">Amount</th>
              <th className="py-1 text-start pl-2">Location</th>
              <th className="py-1 text-start pl-2">Date</th>
              <th className="py-1 text-start pl-2">Status</th>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-100 transition ">
                  <td className=" px-4 border-b text-start pl-2 py-4">
                    {transaction.action}
                  </td>
                  <td className=" px-4 border-b text-start pl-2 py-4">
                    {transaction.amount}
                  </td>
                  <td className=" px-4 border-b text-start pl-2 py-4">
                    {transaction.location}
                  </td>
                  <td className=" px-4 border-b text-start pl-2 py-4">
                    {transaction.date}
                  </td>
                  <td className={` px-4 border-b text-start pl-2 py-4 ${transaction.statusClass}`}>
                    {transaction.status}
                  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
