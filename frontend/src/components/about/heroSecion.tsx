import React from 'react'

export default function HeroSecion() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30">
              🏢 About BrickChain
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Democratizing Real Estate
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Investment in Nigeria
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto leading-relaxed">
              We're building the future of real estate investment through
              blockchain technology, making premium Nigerian properties
              accessible to everyone.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  ₦2.5B+
                </div>
                <div className="text-slate-300">Assets Under Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  15,000+
                </div>
                <div className="text-slate-300">Happy Investors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">50+</div>
                <div className="text-slate-300">Properties Tokenized</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
