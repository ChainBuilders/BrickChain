import { Calculator, ArrowRight } from 'lucide-react'
import React from 'react'

export default function InvestmentCalculator() {
  return (
     <div className="rounded-lg bg-white  border-0 shadow-lg sticky top-24">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight text-xl flex items-center">
                  <Calculator />
                  Investment Calculator
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <div>
                  <label className="font-bold text-slate-700" htmlFor="input">
                    {" "}
                    Investment Amount (₦)
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-stone-3 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                    type="number"
                    name=""
                    id=""
                  />
                  <p className=" text-slate-500 mt-1">Minimum: N₦10,000</p>
                </div>
                <div className="space-y-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tokens to receive</span>
                    <span className="font-semibold">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ownership percentage</span>
                    <span className="font-semibold">0.0667%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly returns</span>
                    <span className="font-semibold text-emerald-600">₦354</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-200 pt-3">
                    <span className="font-semibold">Annual returns</span>
                    <span className="font-bold text-emerald-600">₦4250</span>
                  </div>
                </div>
                <div className="space-y-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                  <button className="inline-flex items-center justify-center gap-2 text-white whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg py-6">
                    Invest Now
                    <ArrowRight color="white" />
                  </button>
                </div>
                <div className="text-center"> 
                  <p className="text-xs text-slate-500">
                    By investing, you agree to our
                    <a href="#" className="text-emerald-600 hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>
  )
}
