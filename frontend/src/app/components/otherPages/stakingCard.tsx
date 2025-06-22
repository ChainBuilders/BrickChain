"use client"; 


import React from 'react';
import {
  Home,
  Coins,
  LineChart,
  Timer
} from 'lucide-react';

type StakingCardProps = {
  property: string;
  location: string;
  tokensStaked: number;
  startDate: Date
  endDate: Date;
  tokenPercentage: number; // % of holdings
  apy: string;
  rewardsEarned: string;
  lockDuration: string; // e.g., "Flexible" or "90 days"
  image?: string;
  onClaim: () => void;
  onUnstake: () => void;
};

const StakingCard = ({
  property,
  location,
  tokensStaked,
  tokenPercentage,
  apy,
  rewardsEarned,
  startDate,
  endDate,
  lockDuration,
  image,
  onClaim,
  onUnstake
}: StakingCardProps) => {
  return (
    <div className="bg-white rounded-2xl min-w-[350px] shadow-md overflow-hidden hover:shadow-lg transition w-full">
      {image && (
        <img src={image} alt={property} className="w-full h-40 object-cover" />
      )}
      <div className="p-3 space-y-4">
        <div className="flex items-center space-x-2">
          <Home size={30} className="text-green-700" />
          <h3 className=" font-[400] text-gray-900">{property}</h3>
          <span className="text-sm text-gray-500">({location})</span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            <strong className="text-[#877512]">Tokens Staked:</strong> {tokensStaked.toLocaleString()} ({tokenPercentage}% of your holdings)
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${tokenPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Yield Info */}
        <div className="flex items-center space-x-2 text-green-700 text-sm">
          <LineChart className="w-4 h-4" />
          <span><strong>APY:</strong> {apy}</span>
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-yellow-600">
            <Coins className="w-4 h-4" />
            <span><strong>Rewards:</strong> {rewardsEarned}</span>
          </div>
          <button
            onClick={onClaim}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium transition"
          >
            Claim
          </button>
        </div>

        {/* Lock Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Timer className="w-4 h-4" />
          <span><strong>Lock Duration:</strong> {lockDuration}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={onUnstake}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded transition text-sm"
          >
            Unstake
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakingCard;
