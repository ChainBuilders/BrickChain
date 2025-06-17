import React from "react";

export default function WhyBlockChain() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center ">
      <div className=" bg-[#0f6a09] rounded-l-2xl ">
        <h2 className="text-[35px] font-[600] max-w-[400px] text-white text-center p-4   mb-8">
          Built for Nigeria, Powered by Blockchain
        </h2>
      </div>
      <ol className="list-decimal pl-10 pr-2     text-[20px] font-[600] border-r-[10px] flex flex-col space-y-6 justify-center rounded-r-2xl text-[#877512] ">
        <li>Audited smart contracts (no rug pulls).</li>
        <li>Diaspora-friendly: Invest from anywhere with stablecoins.</li>
        <li>Legal compliance: Partners with Nigerian registrars.</li>
        <li>Instant liquidity via P2P/DEX trading.*</li>
      </ol>
    </div>
  );
}
