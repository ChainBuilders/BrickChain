import React from "react";
import { CircleCheckBig, Shield, Users,ChartColumn , Building} from "lucide-react";

export default function WhyBlockChain() {
  return (
    <div className="bg-gradient-to-r from-[#164f3f] w-full to-[#16574a] flex-col  md:flex-row py-24 px-4 sm:px-6 lg:px-8 flex ">
      <div className=" flex flex-col space-y-8 w-full ">
        <h1 className="text-[45px] font-[600] leading-[50px] text-white flex flex-col">
          <span className="">
          Built for Nigeria, 
          </span>
          <span className="text-[#34b792]">
          Powered by Blockchain
          </span>
        </h1>
        <p className="text-white text-[28px]">
          We built the most secure and compliant platform for real estate tokenization in Nigeria.
        </p>
        <div className=" flex gap-2">
          <CircleCheckBig color="#34b792" size={30}/>
          <div className="flex flex-col  text-[22px]">
            <h1 className="text-white font-[600] ">Audited Smart Contract</h1>
            <p className="text-white/60">No rug pull. All contracts are audited by leading security firm</p>
          </div>
        </div>
      <div className=" flex gap-2">
          <CircleCheckBig color="#34b792" size={30}/>
          <div className="flex flex-col  text-[22px]">
            <h1 className="text-white font-[600] ">Diasporal-Friendly Investment</h1>
            <p className="text-white/60">Invest from anywhere with stablecoins and international payment method</p>
          </div>
        </div>
      <div className=" flex gap-2">
          <CircleCheckBig color="#34b792" size={30}/>
          <div className="flex flex-col  text-[22px]">
            <h1 className="text-white font-[600] ">Legal Compliance</h1>
            <p className="text-white/60">Fully compliant with nigerian regulation and international standard</p>
          </div>
        </div>
      <div className=" flex gap-2">
          <CircleCheckBig color="#34b792" size={30}/>
          <div className="flex flex-col  text-[22px]">
            <h1 className="text-white font-[600] ">Instand Liquidity via P2PDEX Traiding</h1>
            <p className="text-white/60">Trade your token 24/7 on our Decentralized exchange</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center px-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 bg-white/10 w-full py-12 px-5 rounded-2xl">
          <div className="flex flex-col w-full items-center justify-center ">
            <Shield color="#34b792" size={60} />
            <h1 className="text-white font-[600] text-[27px]">100%</h1>
            <p className="text-stone-300 text-center text-lg">secured</p>
          </div>
         <div className="flex flex-col w-full items-center justify-center ">
            <Users color="#34b792" size={60} />
            <h1 className="text-white font-[600] text-[27px]">100%</h1>
            <p className="text-stone-300 text-center text-lg">secured</p>
          </div>
         <div className="flex flex-col w-full items-center justify-center ">
            <Building color="#34b792" size={60} />
            <h1 className="text-white font-[600] text-[27px]">100%</h1>
            <p className="text-stone-300 text-center text-lg">secured</p>
          </div>
         <div className="flex flex-col w-full items-center justify-center ">
            <ChartColumn color="#34b792" size={60} />
            <h1 className="text-white font-[600] text-[27px]">100%</h1>
            <p className="text-stone-300 text-center text-lg">secured</p>
          </div>
        </div>
      </div>
      {/* <ol className="list-decimal pl-10 pr-2     text-[20px] font-[600] border-r-[10px] flex flex-col space-y-6 justify-center rounded-r-2xl text-[#877512] ">
        <li>Audited smart contracts (no rug pulls).</li>
        <li>Diaspora-friendly: Invest from anywhere with stablecoins.</li>
        <li>Legal compliance: Partners with Nigerian registrars.</li>
        <li>Instant liquidity via P2P/DEX trading.*</li>
      </ol> */}
    </div>
  );
}
