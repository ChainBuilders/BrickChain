"use client";

import { useModalStore } from "@/stores/modalStore";
import { X } from "lucide-react";
// import { useState } from "react";
import InvestmentForm from "./InvestmentForm";

function InvestmentModal() {
  const { isInvestNowOpen, onCloseInvestNowModal, selectedProperty } =
    useModalStore();
  //   const [currentStep, setCurrentStep] = useState(1);

  //   const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    onCloseInvestNowModal();
    // setCurrentStep(1);
    // setErrors({});
  };

  if (!isInvestNowOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 select-none flex justify-center items-center z-50">
      <div className="bg-white overflow-hidden p-6 rounded-md w-full sm:max-w-md overflow-y-auto max-h-[95vh] relative animate-in fade-in duration-500">
        <button
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-2 text-gray-400"
          onClick={handleClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-between mb-4 items-center">
          <span className="text-xl font-semibold">
            Invest in {selectedProperty?.name || "property name"}
          </span>
          {/* <div className="flex space-x-1 mr-5">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-2 h-2 rounded-full ${
                  stepNumber <= currentStep ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
            ))}
          </div> */}
        </div>

        <InvestmentForm />
      </div>
    </div>
  );
}

export default InvestmentModal;
