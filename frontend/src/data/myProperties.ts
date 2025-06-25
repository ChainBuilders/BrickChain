export const myProperties = [
  {
    name: "Lagos Duplex",
    location: "Victoria Island, Lagos",
    invested: "₦500,000",
    currentValue: "₦580,000",
    monthlyIncome: "₦12,000",
    change: 16.0,
    tokensOwned: "1,000 tokens",
    ownershipPercent: 1.0,
    status: "Active",
    image: "/duplex1.jpg",
  },
  {
    name: "Abuja Apartments",
    location: "Maitama, Abuja",
    invested: "₦750,000",
    currentValue: "₦825,000",
    monthlyIncome: "₦18,500",
    change: 10.0,
    tokensOwned: "1,500 tokens",
    ownershipPercent: 0.67,
    status: "Active",
    image: "/duplex1.jpg",
  },
  {
    name: "Lekki Terrace",
    location: "Lekki Phase 1, Lagos",
    invested: "₦350,000",
    currentValue: "₦385,000",
    monthlyIncome: "₦8,200",
    change: 10.0,
    tokensOwned: "700 tokens",
    ownershipPercent: 100.0,
    status: "Active",
    image: "/duplex3.jpg",
  },
];

export const recentTransactions = [
  {
    type: "Investment",
    property: "Lagos Duplex",
    amount: "₦100,000",
    date: "2024-01-15",
    direction: "up", // used to determine the arrow icon
  },
  {
    type: "Dividend",
    property: "Abuja Apartments",
    amount: "₦18,500",
    date: "2024-01-10",
    direction: "down",
  },
  {
    type: "Investment",
    property: "Lekki Terrace",
    amount: "₦50,000",
    date: "2024-01-08",
    direction: "up",
  },
];

export const portfolioAllocation = [
  {
    city: "Lagos Properties",
    percentage: 60,
    color: 'bg-emerald-500'
  },
  {
    city: "Abuja Properties",
    percentage: 30,
    color: 'bg-blue-500'
  },
  {
    city: "Other Cities",
    percentage: 10,
    color : "bg-purple-500"
  },
];
