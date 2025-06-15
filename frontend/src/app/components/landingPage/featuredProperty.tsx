import React from 'react';
import PropertyCard from '../ui/propertyCard';
import Button from '../ui/Button';

const listings = [
    {
        name: 'Lagos Duplex',
        value: '₦100M',
        tokens: '100,000 tokens (₦1,000/token)',
        yieldInfo: '5% staking APY',
        image: '/duplex2.jpg', 
    },
    {
        name: 'Abuja Apartments',
        value: '₦60M',
        tokens: '60,000 tokens',
        yieldInfo: '5% APY + resale market',
        image: '/duplex1.jpg', 
    },
    {
        name: 'Victoria Island Penthouse',
        value: '₦250M',
        tokens: '250,000 tokens (₦1,000/token)',
        yieldInfo: '6% APY',
        image: '/duplex3.jpg',
    },
    {
        name: 'Lekki Terrace',
        value: '₦80M',
        tokens: '80,000 tokens (₦1,000/token)',
        yieldInfo: '4.5% APY',
        image: '/duplex4.jpg',
    },
    {
        name: 'Ikoyi Mansion',
        value: '₦500M',
        tokens: '500,000 tokens (₦1,000/token)',
        yieldInfo: '6.5% APY',
        image: '/bongalo1.jpg',
    },
    {
        name: 'Port Harcourt Villa',
        value: '₦120M',
        tokens: '120,000 tokens (₦1,000/token)',
        yieldInfo: '5.2% APY',
        image: '/bongalo2.jpg',
    },
    {
        name: 'Enugu Smart Home',
        value: '₦70M',
        tokens: '70,000 tokens (₦1,000/token)',
        yieldInfo: '4.8% APY',
        image: '/bongalo3.jpg',
    },
];

const ListingsSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Invest in Iconic Nigerian Properties
      </h2>
      <p className="text-center text-sm text-gray-500 mt-6 max-w-xl mx-auto">
        Listings are illustrative. Actual properties require verification.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto px-20">
        {listings.map((property, idx) => (
          <PropertyCard key={idx} {...property} />
        ))}
      </div>

      <div className='w-full flex justify-center'>
        <Button link="/properties" className="mt-8 w-[250px] mx-auto py-3 bg-[#877512] hover:bg-[#6f5a0c] hover:border-white border-2  text-white">
          View All Properties
        </Button>
      </div>
    </section>
  );
};

export default ListingsSection;
