"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building, CheckCircle, X } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";
import AddPropertyForm from "./AddPropertyForm";

export function AddPropertyModal() {
  const { isAddPropertyOpen, onCloseAddPropertyModal } = useModalStore();
  const [currentStep, setCurrentStep] = useState(5);

  useEffect(() => {
    if (isAddPropertyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isAddPropertyOpen]);

  if (!isAddPropertyOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 select-none flex justify-center items-center z-50">
      <div className="bg-white overflow-hidden p-6 rounded-md w-full max-w-4xl overflow-y-auto max-h-[95vh] relative animate-in fade-in duration-500">
        <button
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-2 text-gray-400"
          onClick={onCloseAddPropertyModal}
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <div className="flex items-center mb-6 font-bold text-2xl">
            <Building className="w-8 h-8 mr-2" />
            <span> Add New Property</span>
          </div>
        </div>

        {/* steps */}
        <div className="flex items-center justify-between mt-10 mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              {step < 5 && (
                <div
                  className={`w-44 -ml-1 transition-all duration-1000 -mr-1 h-1 mx-2 ${
                    step < currentStep ? "bg-emerald-500" : "c"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* steps lebel */}
        <div className="flex justify-between mb-10 text-sm">
          <span
            className={
              currentStep === 1
                ? "text-emerald-600 font-medium"
                : "text-slate-500"
            }
          >
            Basic Info
          </span>
          <span
            className={
              currentStep === 2
                ? "text-emerald-600 font-medium"
                : "text-slate-500"
            }
          >
            Property Details
          </span>
          <span
            className={
              currentStep === 3
                ? "text-emerald-600 font-medium"
                : "text-slate-500"
            }
          >
            Financial Info
          </span>
          <span
            className={
              currentStep === 4
                ? "text-emerald-600 font-medium"
                : "text-slate-500"
            }
          >
            Geolocation
          </span>
          <span
            className={
              currentStep === 5
                ? "text-emerald-600 font-medium"
                : "text-slate-500"
            }
          >
            Documents
          </span>
        </div>

        <AddPropertyForm currentStep={currentStep} />

        <div className="flex justify-between mt-6 pt-6 border-t border-t-slate-200">
          <button
            className={`border border-gray-300 rounded-md cursor-pointer flex justify-center  space-x-5 items-center py-2 px-4 rounded-m
                 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            //   onClick={handleNext}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              //   onClick={nextStep}
              className="ml-auto bg-gradient-to-r  cursor-pointer space-x-2 flex justify-center items-center py-2 px-6 rounded-md from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              <span> Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              //   onClick={handleSubmit}
              //   disabled={isSubmitting}
              className="ml-auto bg-gradient-to-r  cursor-pointer space-x-2 flex justify-center items-center py-2 px-6 rounded-md from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              {/* {isSubmitting ? "Submitting..." : "Submit Property"} */}
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
