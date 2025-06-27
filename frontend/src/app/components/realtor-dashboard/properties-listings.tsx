import React from "react";
import Button from "../ui/Button";
import { Calendar, Eye, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";

function PropertiesListings() {
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

  return (
    <div className="border-0 bg-white p-8 rounded-md shadow-lg animate-in slide-in-from-bottom duration-700 delay-300">
      <div className="mb-5">
        <div className="flex space-y-8 md:space-y-0 flex-col  md:flex-row items-center justify-between">
          <h1 className="text-xl font-medium">My Property Listings</h1>
          <Button className="bg-gradient-to-r w-full md:w-fit  items-center  text-white from-emerald-500 flex justify-center to-teal-600 font-medium hover:to-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          {myListings.map((listing, index) => (
            <div
              key={listing.id}
              className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex  flex-col md:flex-row items-start space-x-4">
                <div className="aspect-square h-40 relative mb-5 rounded-tl-lg rounded-tr-lg overflow-hidden md:w-[80px] md:h-[60px] w-full">
                  <Image
                    src={listing.image || "https://placehold.co/600x400"}
                    alt={listing.name}
                    fill
                    className="w-full  object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {listing.name}
                      </h4>
                      <div className="flex items-center text-sm text-slate-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {listing.location}
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Added {listing.dateAdded}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className={cn(
                          "py-1 text-xs font-semibold px-3 rounded-full",
                          listing.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-orange-100 text-orange-800"
                        )}
                      >
                        {listing.status}
                      </button>
                      <Button>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-slate-500">Total Value</p>
                      <p className="font-semibold text-slate-900">
                        {listing.totalValue}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Funded</p>
                      <p className="font-semibold text-slate-900">
                        {listing.funded}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Investors</p>
                      <p className="font-semibold text-slate-900">
                        {listing.investors}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Commission</p>
                      <p className="font-semibold text-emerald-600">
                        {listing.commission}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">APY</p>
                      <p className="font-semibold text-blue-600">
                        {listing.apy}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Funding Progress</span>
                      <span className="text-slate-600">{listing.funded}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                      <div
                        className="h-full bg-emerald-500  transition-all duration-300"
                        role="progressbar"
                        aria-valuenow={listing.funded}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: `${listing.funded}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertiesListings;
