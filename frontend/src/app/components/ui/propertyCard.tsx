import React from 'react';

type PropertyCardProps = {
  image: string;
  name: string;
  value: string | number;
  tokens: string | number;
  yieldInfo: string | number;
};

const PropertyCard = ({ image, name, value, tokens, yieldInfo }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={name} className="h-48 w-full object-cover" />
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-600">
          <strong className='text-[#877512]'>Value:</strong> {value}<br />
          <strong className='text-[#877512]'>Tokens:</strong> {tokens}<br />
          <strong className='text-[#877512]'>Yield:</strong> {yieldInfo}
        </p>
        <button className="mt-3 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg w-full transition">
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
