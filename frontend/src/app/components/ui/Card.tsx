import React from "react";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  step?: string;
  subText?: string;
};

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  color,
  step,
  subText
}) => {
  const stepBg = color + "33";
  return (
    <div className="bg-white  hover:scale-105 space-y-5 rounded-2xl p-6 flex flex-col justify-center items-center shadow-[1px_5px_8px_rgb(0,0,0,0.2)] transition">
      <div
        className="text-3xl p-4 rounded-full "
        style={{ backgroundColor: color || "#f0f0f0", color: "#000" }}
      >
        {icon}
      </div>
      {step && (
        <div
          className={`w-full rounded-full text-start pl-3 py-1`}
          style={{ backgroundColor: stepBg }}
        >
            {step}
        </div>
      )}
      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
      <p className="text-stone-600 font-[600] text-center text-[20px] ">
        {description}
      </p>
      {subText && (
        <p className="text-stone-600 font-[600] text-center text-[20px] my-10"
        style={{ color: color || "#000" }}>
          {subText}
        </p>
      )}
    </div>
  );
};

export default Card;
