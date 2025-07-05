import React from "react";

export default function CoreValues() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The principles that guide everything we do at BrickChain
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="lucide lucide-shield w-8 h-8 text-white"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
              </div>
              <div className="font-semibold tracking-tight text-xl">
                Trust &amp; Transparency
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-slate-600">
                Every transaction is recorded on blockchain, ensuring complete
                transparency and trust.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="lucide lucide-users w-8 h-8 text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="font-semibold tracking-tight text-xl">
                Accessibility
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-slate-600">
                Making real estate investment accessible to everyone, starting
                from just ₦10,000.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="lucide lucide-globe w-8 h-8 text-white"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <div className="font-semibold tracking-tight text-xl">
                Innovation
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-slate-600">
                Leveraging cutting-edge blockchain technology to revolutionize
                real estate.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-card text-card-foreground border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="lucide lucide-heart w-8 h-8 text-white"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <div className="font-semibold tracking-tight text-xl">
                Community First
              </div>
            </div>
            <div className="p-6 pt-0">
              <p className="text-slate-600">
                Building wealth for Nigerian communities through collaborative
                investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
