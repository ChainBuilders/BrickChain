import Image from "next/image";
import React from "react";
import Overview from "../components/otherPages/overview";
import { ArrowRight, Calculator } from "lucide-react";
import InvestmentCalculator from "../components/otherPages/investmentCalculator";
import PropertiesStatistic from "../components/otherPages/propertiesStatistic";
import { listings } from "@/data/listing";
import PropertyCard from "../components/ui/propertyCard";

export default function Properties() {
  const tabs = ["Overview", "Finncial", "Documents", "Location"];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start justify-between">
              <div className="">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Lagos Luxury Duplex
                  </h1>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-emerald-100 text-emerald-800">
                    Active
                  </div>
                </div>
                <div className="flex items-center text-slate-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-5 h-5 mr-2"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Victoria Island, Lagos
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current mr-1"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                    <span className="font-semibold">4.8</span>
                    <span className="text-slate-600 ml-1">(234 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap  font-medium transition-colors cursor-pointer hover:bg-[#ffeded] hover:text-accent-foreground h-9 rounded-md px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart w-4 h-4 mr-2"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      Save
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors hover:bg-[#ffeded] cursor-pointer hover:text-accent-foreground h-9 rounded-md px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-share w-4 h-4 mr-2"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" x2="12" y1="2" y2="15"></line>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">
                  ₦75,000,000
                </div>
                <div className="text-slate-600">Total Property Value</div>
              </div>
            </div>
            <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/duplex1.jpg"
                  alt="Lagos Luxury Duplex"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left w-5 h-5"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right w-5 h-5"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <button className="w-3 h-3 rounded-full transition-colors bg-white/50"></button>
                  <button className="w-3 h-3 rounded-full transition-colors bg-white/50"></button>
                  <button className="w-3 h-3 rounded-full transition-colors bg-white"></button>
                  <button className="w-3 h-3 rounded-full transition-colors bg-white/50"></button>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg bg-white">
              <div className="h-10 items-center justify-center rounded-md  p-1 text-muted-foreground grid w-full grid-cols-4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-sm px-3 py-2.5 font-medium `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <Overview />
            </div>
          </div>
          <div className="space-y-6 ">
            <InvestmentCalculator />
            <PropertiesStatistic />
          </div>
        </div>
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Similar Properties
            </h2>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border border-stone-300 hover:bg-stone-100 h-10 px-4 py-2">
              View All Properties
              <ArrowRight />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {listings &&
              listings
                .slice(0, 3)
                .map((property, index) => (
                  <PropertyCard key={index} {...property} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
