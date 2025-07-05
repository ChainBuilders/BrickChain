"use client";

import React, { useState } from "react";
import {
  Calendar,
  // Edit,
  Eye,
  Filter,
  MapPin,
  Plus,
  Search,
} from "lucide-react";
// import Image from "next/image";
import { cn } from "@/libs/utils";
import { Input } from "../ui/Input";
import { useModalStore } from "@/stores/modalStore";

function PropertiesListings() {
  const onAddPropertyModal = useModalStore((state) => state.onAddPropertyModal);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const myListings = [
    {
      id: 1,
      name: "Lagos Luxury Duplex",
      location: "Victoria Island, Lagos",
      image: "/duplex1.jpg",
      totalValue: "₦75,000,000",
      funded: 85,
      investors: 45,
      commission: "₦375,000",
      status: "Active",
      dateAdded: "2024-01-15",
      apy: "8.5%",
    },
    {
      id: 2,
      name: "Abuja Modern Apartments",
      location: "Maitama, Abuja",
      image: "/duplex1.jpg",
      totalValue: "₦95,000,000",
      funded: 92,
      investors: 67,
      commission: "₦475,000",
      status: "Active",
      dateAdded: "2024-01-10",
      apy: "9.2%",
    },
    {
      id: 3,
      name: "Lekki Waterfront Villa",
      location: "Lekki Phase 1, Lagos",
      image: "/duplex1.jpg",
      totalValue: "₦120,000,000",
      funded: 45,
      investors: 23,
      commission: "₦270,000",
      status: "Funding",
      dateAdded: "2024-01-20",
      apy: "7.8%",
    },
  ];

  const filteredProperties = myListings.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="border-0 bg-white p-3 md:p-8 rounded-md shadow-lg animate-in slide-in-from-bottom duration-700 delay-300">
      <div className="mb-5">
        <div className="flex space-y-8 md:space-y-0 flex-col  md:flex-row items-center justify-between">
          <h1 className="text-xl font-medium">My Property Listings</h1>
          <button
            className="bg-gradient-to-r group py-2 px-4 rounded-md w-full md:w-fit  items-center  text-white from-emerald-500 flex justify-center to-teal-600 font-medium hover:to-teal-700"
            onClick={onAddPropertyModal}
          >
            <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
            Add Property
          </button>
        </div>

        <div className="flex space-x-1 md:space-x-3 mt-4 h-12">
          <div className="relative flex-1  ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-full"
            />
          </div>

          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[16px] hover:bg-gray-200 font-medium transition-all py-1 border border-gray-300 px-3">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>

        </div>
      </div>
      <div>
        <div>
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-slate-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex flex-col md:flex-row  md:items-center space-y-2  md:space-x-4 text-sm">
                      <span className="text-slate-600">
                        Value: {property.totalValue}
                      </span>
                      <span className="text-slate-600">
                        APY: {property.apy}
                      </span>
                      <span className="text-slate-600">
                        Investors: {property.investors}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      className={cn(
                        "py-1 text-xs font-semibold px-3 rounded-full",
                        property.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-orange-100 text-orange-800"
                      )}
                    >
                      {property.status}
                    </button>
                    {/* <Button>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button> */}
                  </div>
                </div>

                {property.status === "Active" && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2 text-slate-600 ">
                      <span>Funding Progress</span>
                      <span>{property.funded}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${property.funded}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Added {new Date(property.dateAdded).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[16px] hover:bg-gray-200 font-medium transition-all py-1 px-3">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    {/* <Button>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesListings;
