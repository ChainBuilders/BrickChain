import React from 'react';

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-md hover:scale-110 rounded-2xl p-6 flex flex-col items-start space-y-4 hover:shadow-lg transition">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-[#877512] text-start">{description}</p>
    </div>
  );
};

export default Card;
