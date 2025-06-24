import React from "react";
type PropertyCardProps = {
  image: string;
  name: string;
  value: string | number;
  tokens: string | number;
  yieldInfo: string | number;
  minInvestment: string | number;
  status: string;
  rating: number;
};

const PropertyCard = ({
  image,
  name,
  value,
  tokens,
  yieldInfo,
  minInvestment,
  status,
  rating,
}: PropertyCardProps) => {

  const percentage = Number(yieldInfo) * 10;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative bg-gray-400 w-full ">
        <img src={image} alt={name} className="h-48 w-full object-cover" />
        <span className="absolute top-2 left-2 bg-[#34b792] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {status}
        </span>
        <span className="absolute top-2 right-2 bg-[#555555] text-white px-3 py-1 rounded-full text-sm font-semibold">
          ★ {rating}
        </span>
      </div>
      <div className="w-full space-y-5 pb-4 px-2">
        <div className="flex w-full justify-between px-2 pt-3">
          <h3 className=" font-semibold w-full text-gray-900 flex flex-col ">
            <span className="md:text-[30px] truncate"> {name}</span>
            <span className="text-gray-500 flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin-check-inside-icon lucide-map-pin-check-inside"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <path d="m9 10 2 2 4-4" />
              </svg>{" "}
              <span>Sub location</span>
            </span>
          </h3>
          <div className="text-[#877512] w-full items-end flex flex-col">
            <span className="text-[30px] font-[600]  text-gray-900">
              {value}
            </span>
            <p className="text-gray-500">Total Value</p>
          </div>{" "}
          <br />
        </div>
        <div className="flex justify-between px-2 w-full">
          <div className="flex flex-col w-full">
            <span className="text-gray-500">Availavle Tokens:</span>{" "}
            <span className="font-[600]">{tokens}</span>
          </div>{" "}
          <div className="flex flex-col w-full">
            <span className="text-gray-500">Minimum Investment:</span>{" "}
            <span className="font-[600]">{minInvestment}</span>
          </div>{" "}
        </div>

        <div className="flex flex-col px-2 w-full">
          <div className="flex justify-between  items-center ">
            <div className="bg-gradient-to-r from-[#40c19c] space-x-1 flex to-[#31cc96] text-lg font-[600] bg-clip-text text-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#40c19c"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trending-up-icon lucide-trending-up"
            >
              <path d="M16 7h6v6" />
              <path d="m22 7-8.5 8.5-5-5L2 17" />
            </svg>
            <span>{yieldInfo}%</span>
            <span>APY</span>
            </div>
            <div className="text-gray-500 text-lg font-[500] space-x-2">
              <span className="">{percentage}%</span>
              <span>Funded</span>
              </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-[#40c19c] h-2.5 rounded-full transition-all duration-500 linear"
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="px-2 w-full">

        <button className="mt-3 bg-gradient-to-r from-[#47d9b0] to-[#1b9067] text-white font-semibold px-4 py-2 rounded-lg w-full transition">
          Invest Now
        </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
