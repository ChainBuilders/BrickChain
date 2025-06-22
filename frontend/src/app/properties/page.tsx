"use client";

import React from "react";
import SearchBar from "../components/ui/searchBar";
import { ChevronDown } from "lucide-react";
import PropertyCard from "../components/otherPages/propertyCard2";

export default function Properties() {
  const properties = [
    {
      image: "/duplex2.jpg",
      name: "Lagos Duplex",
      pricePerToken: "₦1,000",
      yield: "5% APY",
      progress: "64% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
    {
      image: "/bongalo1.jpg",
      name: "Abuja Bungalow",
      pricePerToken: "₦2,000",
      yield: "6% APY",
      progress: "45% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
    {
      image: "/duplex1.jpg",
      name: "Enugu Terrace",
      pricePerToken: "₦1,500",
      yield: "5.5% APY",
      progress: "78% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
    {
      image: "/duplex3.jpg",
      name: "Port Harcourt Villa",
      pricePerToken: "₦2,500",
      yield: "7% APY",
      progress: "32% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
    {
      image: "/bongalo2.jpg",
      name: "Ibadan 3-Bed Flat",
      pricePerToken: "₦900",
      yield: "4.8% APY",
      progress: "90% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
    {
      image: "/bongalo4.jpg",
      name: "Lekki Smart Home",
      pricePerToken: "₦3,000",
      yield: "6.5% APY",
      progress: "51% tokenized",
      buttonText: "Invest",
      currencyOptions: ["USDC", "cNGN"],
    },
  ];

  const [selected, setSelected] = React.useState("All");
  const [toggleFilter, setToggleFilter] = React.useState(false);
  const filters = ["All", "Abuja", "Lagos", "Port Harcourt", "Ibadan", "Kano"];

  const handleFilterChange = (filter: string) => {
    setSelected(filter);
  };
  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };
  return (
    <div className="pt-5 px-4 md:px-20 lg:px-40 bg-[white] min-h-screen">
      <div className="w-full flex items-center justify-between ">
        <SearchBar />
        <div className="flex items-center space-x-2 relative">
          <strong className="text-green-800">Filter:</strong>
          <p className="border-b w-[200px] text-cente flex justify-between items-center bg-[#f6f2f2] border-[#000000] text-[#000000] py-2 px-2">
            {" "}
            <span className="">{selected}</span>{" "}
            <button onClick={handleToggleFilter}>
              <ChevronDown />{" "}
            </button>
          </p>
          <div
            className={`flex space-x-2 ml-4 absolute right-0 top-10 ${
              toggleFilter ? "flex-col" : "hidden"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  handleFilterChange(filter);
                  handleToggleFilter();
                }}
                className={`px-4 py-2  transition text-start w-full ${
                  selected === filter
                    ? "bg-green-700 text-white"
                    : "bg-white text-green-700 hover:bg-green-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-5">
        {properties &&
          properties.map((item, index) => (
            <PropertyCard
              image={item.image}
              key={index}
              name={item.name}
              pricePerToken={item.pricePerToken}
              yield={item.yield}
              progress={item.progress}
              currencyOptions={item.currencyOptions}
            />
          ))}
      </div>
    </div>
  );
}
