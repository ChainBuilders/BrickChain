import Image from "next/image";
import React from "react";

type TeamCardProps = {
    name: string,
    img: string,
    about: string,
    role: string
}
export default function TeamCard({name, role, about, img}: TeamCardProps) {
  return (
    <div className="p-6 text-center">
      <div className="relative mb-6">
        <Image
          alt={name + " image"}
          loading="lazy"
          width="170"
          height="170"
          decoding="async"
          data-nimg="1"
          className="rounded-full border-2 max-w-[170px] border-red-500 flex flex-none min-w-[170px] min-h-[170px] max-h-[170px] mx-auto object-cover"
          src={img}
          style={{ color: "transparent" , objectFit: "cover"}}
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-star w-4 h-4 text-white fill-current"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
          </svg>
        </div>
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{name}</h4>
      <p className="text-emerald-600 font-medium mb-3">{role}</p>
      <p className="text-sm text-slate-600">
        {about}
      </p>
    </div>
  );
}
