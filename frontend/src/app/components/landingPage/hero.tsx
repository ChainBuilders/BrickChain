
import React from "react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <div className={"bg-[white] w-full p-8 "} 
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
      }}
    >
      <div className="w-full max-w-[900px] bg-white mx-auto py-10 border-x-[20px] space-y-2 rounded-2xl shadow-[5px_2px_5px_2px_rgb(15,106,9,0.5)] border-[#0f6a09] px-4">
        <h1 className="text-center text-[#0f6a09] text-[45px] font-[600] leading-10">
          Own a Piece of Nigeria’s Real Estate Without the Millions
        </h1>
        <h2 className="text-[20px] text-[#877512] text-center font-[600] leading-6">
          BrickChain lets you invest in Lagos, Abuja, and Enugu properties with
          as little as <strong>₦10,000.</strong> Tokenize, trade, and earn
          yield—all on <strong>blockchain</strong>."
        </h2>
        <div className="w-full flex justify-end py-[20px] px-[20px]">
          <Button link="/register" className="w-[200px] bg-green-700 hover:bg-green-800">
            Get Started
          </Button>
          <Button link="/about" className="w-[200px] ml-4 bg-green-700 hover:bg-green-800">
            How it works
          </Button>
        </div>
      </div>
    </div>
  );
}
