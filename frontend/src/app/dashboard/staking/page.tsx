"use client"

import StakingCard from '@/app/components/otherPages/stakingCard'
import React from 'react'

export default function Stakings() {
  const properties = [
    {
      property: "Ibadan 3-Bed Flat",
      location: "123 Main St, City",
      tokensStaked: 1000,
      tokenPercentage: 10,
      apy: "12.5",
      rewardsEarned: "50",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      lockDuration: "12 months",
      image: "/bongalo2.jpg",
    },
    {
      property: "Lagos Duplex",
      location: "456 Broad Ave, Lagos",
      tokensStaked: 800,
      tokenPercentage: 8,
      apy: "11.0",
      rewardsEarned: "40",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2025-01-31"),
      lockDuration: "12 months",
      image: "/duplex2.jpg",
    },
    {
      property: "Abuja Bungalow",
      location: "789 Unity Rd, Abuja",
      tokensStaked: 1200,
      tokenPercentage: 12,
      apy: "13.0",
      rewardsEarned: "60",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2025-02-28"),
      lockDuration: "12 months",
      image: "/bongalo1.jpg",
    },
    {
      property: "Enugu Terrace",
      location: "321 Hill St, Enugu",
      tokensStaked: 950,
      tokenPercentage: 9.5,
      apy: "12.0",
      rewardsEarned: "48",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      lockDuration: "12 months",
      image: "/duplex1.jpg",
    },
    {
      property: "Port Harcourt Villa",
      location: "654 River Rd, Port Harcourt",
      tokensStaked: 1100,
      tokenPercentage: 11,
      apy: "14.0",
      rewardsEarned: "55",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2025-04-30"),
      lockDuration: "12 months",
      image: "/duplex3.jpg",
    },
    {
      property: "Lekki Smart Home",
      location: "987 Tech Blvd, Lekki",
      tokensStaked: 1050,
      tokenPercentage: 10.5,
      apy: "13.5",
      rewardsEarned: "53",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-05-31"),
      lockDuration: "12 months",
      image: "/bongalo4.jpg",
    },
  ];

  return (
    <div className='flex gap-[10px]  overflow-x-scroll max-w-[1550px]'>
      {properties.map((property, index) => (
        <StakingCard
          key={index}
          property={property.property}
          location={property.location}
          tokensStaked={property.tokensStaked}
          tokenPercentage={property.tokenPercentage}
          apy={property.apy}
          rewardsEarned={property.rewardsEarned}
          startDate={property.startDate}
          endDate={property.endDate}
          lockDuration={property.lockDuration}
          image={property.image}
          onClaim={() => { /* handle claim */ }}
          onUnstake={() => { /* handle unstake */ }}
        />
      ))}
     
    </div>
  )
}
