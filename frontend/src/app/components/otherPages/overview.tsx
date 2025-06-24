import { Bath, BedDouble, Car, icons, Ruler } from "lucide-react";
import React from "react";

export default function Overview() {
  const propertyData = {
    description:
      "A stunning 4-bedroom duplex in the heart of Victoria Island, featuring modern amenities and premium finishes. This property offers excellent rental yield potential and capital appreciation prospects.",

    details: {
      bedrooms: {
        icon: <BedDouble color="white" size={20} />,
        value: 4,
        bg: "from-emerald-500 to-teal-500",
      },
      bathrooms: {
        icon: <Bath color="white" size={20} />,
        value: 5,
        bg: "from-blue-500 to-cyan-500",
      },
      floorArea: {
        icon: <Ruler color="white" size={20} />,
        value: "450 sqm",
        bg: "from-purple-500 to-pink-500",
      },
      parkingSpaces: {
        icon: <Car color="white" size={20} />,
        value: 3,
        bg: "from-orange-500 to-red-500",
      },
    },

    features: [
      "Swimming Pool",
      "24/7 Security",
      "Backup Generator",
      "High-Speed Internet",
      "Gym Facility",
      "Children's Playground",
      "Parking Garage",
      "CCTV Surveillance",
    ],

    investmentProgress: {
      totalTokens: 150000,
      availableTokens: 45000,
      investorCount: 234,
    },
  };
  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Property Description
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {propertyData.description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(propertyData.details).map(([key, detail]) => (
            <div key={key} className="detail-item text-center flex-col flex">
              <span
                className={`detail-icon w-12 h-12 bg-gradient-to-r ${detail.bg} rounded-full flex items-center justify-center mx-auto mb-2`}
              >
                {detail.icon}
              </span>
              <span className="detail-value font-semibold text-slate-900">
                {detail.value}
              </span>
              <span className="detail-label text-slate-600">{key}</span>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">
            Property Features
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(propertyData.details).map(([key]) => (
              <div key={key} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600">{key}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h4 className="font-semibold text-slate-900 mb-4">
            Investment Progress
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Funding Progress</span>
              <span className="font-semibold text-slate-900">70%</span>
            </div>
            <div
              aria-valuemax={100}
              aria-valuemin={0}
              role="progressbar"
              data-state="indeterminate"
              data-max="100"
              className="relative w-full overflow-hidden rounded-full bg-gray-200 h-3"
            >
              <div
                data-state="indeterminate"
                data-max="100"
                className="h-full w-full flex-1 bg-black transition-all"
                style={{ transform: "translateX(-30%)" }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-semibold text-slate-900">150,000</div>
                <div className="text-sm text-slate-600">Total Tokens</div>
              </div>
              <div>
                <div className="font-semibold text-emerald-600">45,000</div>
                <div className="text-sm text-slate-600">Available</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">234</div>
                <div className="text-sm text-slate-600">Investors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
