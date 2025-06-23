import React from "react";
import PropertyCard from "../ui/propertyCard";
import Button from "../ui/Button";
import { listings } from "@/data/listing";

const ListingsSection = () => {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto md:px-20">
        {listings.map((property, idx) => (
          <PropertyCard key={idx} {...property} />
        ))}
      </div>

      <div className="flex flex-col items-center mt-10">
        <Button
          link="/properties"
          className="mt-8 lg:w-[250px] flex justify-center items-center  py-3 bg-gradient-to-r from-[#34b792] w-[180px] to-[#328b79] hover:border-white border-2 border- text-white"
        >
          <span>View all properties</span>
        </Button>
      </div>
    </section>
  );
};

export default ListingsSection;
