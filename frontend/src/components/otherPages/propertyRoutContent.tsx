// src/components/otherPages/propertyContent.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Overview from "./overview";
import Financial from "./financial";
import Documents from "./documents";
import Locations from "./locations";
import InvestmentCalculator from "./investmentCalculator";
import PropertiesStatistic from "./propertiesStatistic";
import { ArrowRight } from "lucide-react";
import PropertyCard from "../ui/propertyCard";

export default function PropertyContent({ property, properties }: { property: any, properties: any[] }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Financial", "Documents", "Location"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {property.name}
                  </h1>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {property.status}
                  </div>
                </div>
                <div className="text-slate-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.672 2-1.5S13.104 8 12 8s-2 .672-2 1.5.896 1.5 2 1.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c4.418-3.134 6-5.015 6-8.5a6 6 0 10-12 0c0 3.485 1.582 5.366 6 8.5z" />
                  </svg>
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{property.totalValue}</div>
                <div className="text-slate-600">Total Property Value</div>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-lg bg-card border-0 shadow-lg overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.name}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Tabs */}
            <div className="rounded-lg bg-white border-0 shadow-lg">
              <div className="h-10 items-center justify-center rounded-md p-1 bg-[#eeeded] grid w-full grid-cols-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center justify-center gap-2 ${
                      activeTab === tab ? "bg-white" : "bg-transparent"
                    } whitespace-nowrap cursor-pointer rounded-sm px-3 py-2.5 font-medium`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab === "Overview" && <Overview propertyData={property} />}
                {activeTab === "Financial" && <Financial financialData={property.financials} />}
                {activeTab === "Documents" && <Documents />}
                {activeTab === "Location" && <Locations propertyLocationData={property} />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <InvestmentCalculator />
            <PropertiesStatistic propertyStatistics={property} />
          </div>
        </div>

        {/* Similar Properties */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Similar Properties</h2>
            <button className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 hover:bg-stone-100 h-10 px-4 py-2 font-medium">
              View All Properties
              <ArrowRight />
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {properties &&
              properties
                .filter((p) => p.id !== property.id)
                .slice(0, 4)
                .map((similar) => (
                  <PropertyCard
                    key={similar.id}
                    image={similar.images[0]}
                    value={similar.totalValue}
                    tokens={similar.totalTokens}
                    yieldInfo={similar.expectedAPY}
                    rating={4}
                    {...similar}
                  />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
