import React from 'react'
import { myProperties } from '@/data/myProperties'
import Image from 'next/image'
import { Plus, MapPin, ArrowUpRight } from 'lucide-react'

export default function Properties() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold tracking-tight text-xl">
                My Properties
              </h1>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-white h-10 font-medium outline-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <Plus color="white" /> <span>Invest More</span>
              </button>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                {myProperties &&
                  myProperties.map((items, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <Image
                          src={items.image}
                          alt=""
                          width={100}
                          height={80}
                          className="object-fit rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h1 className="font-semibold text-slate-900">
                                {items.name}
                              </h1>
                              <div className="flex items-center text-sm text-slate-600 mt-1">
                                <MapPin />
                                {items.location}
                              </div>
                            </div>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-emerald-100 text-emerald-800">
                              {items.status}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-lg text-slate-500">Invested</p>
                              <p className="font-semibold text-slate-900">
                                {items.invested}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-slate-500">
                                Current Value
                              </p>
                              <p className="font-semibold text-slate-900">
                                {items.currentValue}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-slate-500">
                                Monthly Income
                              </p>
                              <p className="font-semiboldfont-semibold text-emerald-600">
                                {items.monthlyIncome}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-slate-500">Change</p>
                              <p className="font-semibold flex space-x-2 text-emerald-600 items-center">
                                {" "}
                                <ArrowUpRight size={14} color="green" /> +{" "}
                                {items.change}%
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-slate-600 text-lg">
                                Ownership: {items.tokensOwned}{" "}
                              </span>
                              <span className="text-slate-600 text-lg">
                                {items.ownershipPercent}%
                              </span>
                            </div>
                            <div className="w-full h-[8px] rounded-full bg-stone-200">
                              <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                role="progressbar"
                                aria-valuenow={items.ownershipPercent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: `${items.ownershipPercent}%` }}
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
  )
}
