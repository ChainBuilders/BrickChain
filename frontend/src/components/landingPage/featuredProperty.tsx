"use client";

import React, { useState } from "react";
import PropertyCard from "../ui/propertyCard";
import Button from "../ui/Button";
import { properties } from "@/data/propertiesData";

const ListingsSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="w-full my-25">
        <h2 className="text-[45px] font-bold text-center text-gray-800">
          Invest in Iconic Nigerian Properties
        </h2>
        <p className="text-center text-3xl text-gray-500 mx-auto">
          Listings are illustrative. Actual properties require verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto md:px-20 max-h-screen overflow-y-scroll my-15 shadow-md border-y border-stone-300 pt-4 pb-4">
        {properties.slice(0, visibleCount).map((property) => (
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

      {visibleCount < properties.length && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={handleLoadMore}
            className="mt-8 lg:w-[250px] flex justify-center items-center py-3 bg-gradient-to-r from-[#34b792] w-[180px] to-[#328b79] hover:border-white border-2 text-white"
          >
            <span>View more properties</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ListingsSection;
