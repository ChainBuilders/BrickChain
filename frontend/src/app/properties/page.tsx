import React from "react";
import { properties } from "@/data/propertiesData";
import PropertyCard from "../components/ui/propertyCard";
import SearchBar from "../components/ui/searchBar";

export default function Properties() {
  return (
    <div className="w-full bg-white">
      <div className=" px-2 md:px-20 pt-8 flex justify-between items-center">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto md:px-20 shadow-md pb-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            image={property.images?.[0] || ""}
            value={property.totalValue}
            tokens={property.totalTokens}
            yieldInfo={property.expectedAPY}
            rating={property.rating}
            name={property.name}
            fundingProgress={property.fundingProgress}
            minInvestment={property.minInvestment}
            status={property.status}
          />
        ))}
      </div>
    </div>
  );
}
