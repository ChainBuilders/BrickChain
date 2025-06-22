import React from "react";
import PropertyCard from "../ui/propertyCard";
import Button from "../ui/Button";

const listings = [
  {
    name: "Lagos Duplex",
    value: "₦100M",
    tokens: "100,000 tokens",
    minInvestment: "₦5,000",
    yieldInfo: 5,
    image: "/duplex2.jpg",
    status: "Active",
    rating: 4.2,
  },
  {
    name: "Abuja Apartments",
    value: "₦60M",
    tokens: "60,000 tokens",
    minInvestment: "₦3,000",
    yieldInfo: 5.5,
    image: "/duplex1.jpg",
    status: "Active",
    rating: 4.0,
  },
  {
    name: "Victoria Island Penthouse",
    value: "₦250M",
    tokens: "250,000 tokens",
    minInvestment: "₦20,000",
    yieldInfo: 6,
    image: "/duplex3.jpg",
    status: "Active",
    rating: 4.7,
  },
  {
    name: "Lekki Terrace",
    value: "₦80M",
    tokens: "80,000 tokens",
    minInvestment: "₦7,500",
    yieldInfo: 4.5,
    image: "/duplex4.jpg",
    status: "Active",
    rating: 4.1,
  },
  {
    name: "Ikoyi Mansion",
    value: "₦500M",
    tokens: "500,000 tokens",
    minInvestment: "₦10,000",
    yieldInfo: 6.5,
    image: "/bongalo1.jpg",
    status: "Active",
    rating: 4.5,
  },
  {
    name: "Port Harcourt Villa",
    value: "₦120M",
    tokens: "120,000 tokens",
    minInvestment: "₦8,000",
    yieldInfo: 5.2,
    image: "/bongalo2.jpg",
    status: "Active",
    rating: 4.3,
  },
  {
    name: "Enugu Smart Home",
    value: "₦70M",
    tokens: "70,000 tokens",
    minInvestment: "₦4,000",
    yieldInfo: 8.8,
    image: "/bongalo3.jpg",
    status: "Active",
    rating: 4.0,
  },
];

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
