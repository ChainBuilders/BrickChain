'use client'
import { Calculator, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

export default function InvestmentCalculator() {
  const [amount, setAmount] = useState(10000); // default to min amount

  // Assume: 
  // - 1 token = ₦100
  // - Total tokens = 150,000
  // - Monthly return rate = 3.54% of amount
  // - Annual return = monthly * 12

  const tokenPrice = 100;
  const totalTokens = 150000;

  const tokens = Math.floor(amount / tokenPrice);
  const ownership = ((tokens / totalTokens) * 100).toFixed(4);
  const monthlyReturn = (amount * 0.0354).toFixed(2);
  const annualReturn = (Number(monthlyReturn) * 12).toFixed(2);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };

  return (
    <div className="rounded-lg bg-white border-0 shadow-lg sticky top-24">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-xl flex items-center gap-2">
          <Calculator />
          Investment Calculator
        </div>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <div>
          <label className="font-bold text-slate-700" htmlFor="investment-input">
            Investment Amount (₦)
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 mt-1"
            type="number"
            id="investment-input"
            min={10000}
            value={amount}
            onChange={handleAmountChange}
          />
          <p className="text-slate-500 mt-1">Minimum: ₦10,000</p>
        </div>

        <div className="space-y-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
          <div className="flex justify-between">
            <span className="text-slate-600">Tokens to receive</span>
            <span className="font-semibold">{tokens}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Ownership percentage</span>
            <span className="font-semibold">{ownership}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Monthly returns</span>
            <span className="font-semibold text-emerald-600">₦{monthlyReturn}</span>
          </div>
          <div className="flex justify-between border-t border-emerald-200 pt-3">
            <span className="font-semibold">Annual returns</span>
            <span className="font-bold text-emerald-600">₦{annualReturn}</span>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
          <button className="inline-flex items-center justify-center gap-2 text-white whitespace-nowrap rounded-md font-medium bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 h-10 px-4 w-full text-lg py-6">
            Invest Now
            <ArrowRight color="white" />
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            By investing, you agree to our{' '}
            <a href="#" className="text-emerald-600 hover:underline">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
