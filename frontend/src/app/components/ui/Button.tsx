"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // If using Next.js App Router

interface ButtonProps {
  link?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ link, children, className = '' }) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
