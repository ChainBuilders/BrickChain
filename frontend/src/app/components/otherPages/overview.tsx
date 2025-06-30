import { Bath, BedDouble, Car, Square } from "lucide-react";
import React from "react";

interface OverviewProps {
  propertyData: {
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: String;
    parkingSpaces: number;
    fundingProgress: number;
    totalTokens: number;
    availableTokens: number;
    investors: number;
    features: String[];
  };
}

export default function Overview({ propertyData }: OverviewProps) {
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
          <div className="detail-item text-center flex-col flex">
            <span
              className={`detail-icon w-12 h-12 bg-gradient-to-r  from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2`}
            >
              <BedDouble color="white" className="stroke-3" size={20} />
            </span>
            <span className="detail-value font-semibold text-slate-900">
              {propertyData.bathrooms}
            </span>
            <span className="detail-label text-slate-600">Bathrooms</span>
          </div>
          <div className="detail-item text-center flex-col flex">
            <span
              className={`detail-icon w-12 h-12 bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2`}
            >
              <Bath color="white" className="stroke-3" size={20} />
            </span>
            <span className="detail-value font-semibold text-slate-900">
              {propertyData.bedrooms}
            </span>
            <span className="detail-label text-slate-600">Bedrooms</span>
          </div>
          <div className="detail-item text-center flex-col flex">
            <span
              className={`detail-icon w-12 h-12 bg-gradient-to-r  from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2`}
            >
              <Square color="white" className="stroke-3" size={20} />
            </span>
            <span className="detail-value font-semibold text-slate-900">
              {propertyData.area}
            </span>
            <span className="detail-label text-slate-600">Floor Area</span>
          </div>
          <div className="detail-item text-center flex-col flex">
            <span
              className={`detail-icon w-12 h-12 bg-gradient-to-r  from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2`}
            >
              <Car color="white" className="stroke-3" size={20} />
            </span>
            <span className="detail-value font-semibold text-slate-900">
              {propertyData.parkingSpaces}
            </span>
            <span className="detail-label text-slate-600">Parking</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">
            Property Features
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {propertyData.features.map((key, index) => (
              <div key={index} className="flex items-center space-x-2">
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
              <span className="font-semibold text-slate-900">
                {propertyData.fundingProgress}
              </span>
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
                <div className="font-semibold text-slate-900">
                  {propertyData.totalTokens}
                </div>
                <div className="text-sm text-slate-600">Total Tokens</div>
              </div>
              <div>
                <div className="font-semibold text-emerald-600">
                  {propertyData.availableTokens}
                </div>
                <div className="text-sm text-slate-600">Available</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {propertyData.investors}
                </div>
                <div className="text-sm text-slate-600">Investors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
