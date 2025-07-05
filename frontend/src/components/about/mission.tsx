import React from "react";

export default function Mission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              To democratize real estate investment in Nigeria by leveraging
              blockchain technology, making it possible for anyone to own a
              piece of premium properties with as little as ₦10,000.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe that everyone deserves the opportunity to build wealth
              through real estate, regardless of their financial background or
              location.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
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
                  className="lucide lucide-target w-8 h-8 text-white"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Our Goal</h4>
                <p className="text-slate-600">
                  Tokenize ₦100B worth of Nigerian real estate by 2026
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <img
                alt="BrickChain Mission"
                loading="lazy"
                width="500"
                height="400"
                decoding="async"
                data-nimg="1"
                className="rounded-lg"
                src="/tali.jpg"
                style={{ color: "transparent;" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
