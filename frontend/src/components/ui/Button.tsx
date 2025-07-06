"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  link?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  link,
  children,
  className = "",
  onClick,
}) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event); // Call user-defined onClick handler
    }

    if (link) {
      router.push(link); // Also handle internal routing if link is provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`font-semibold py-2 px-4 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
