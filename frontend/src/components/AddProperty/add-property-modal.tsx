"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building, CheckCircle, X } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";
import AddPropertyForm from "@/components/AddProperty/AddPropertyForm";
import {
  basicSchema,
  documentsSchema,
  financialInforSchema,
  geolocationSchema,
  propertyDetailSchema,
  propertyDataSchema,
  // type propertyDataType,
} from "@/libs/validations/addPropertiesSchem";
import type { PropertyData } from "./type";

export function AddPropertyModal() {
  const { isAddPropertyOpen, onCloseAddPropertyModal } = useModalStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [propertyData, setPropertyData] = useState<PropertyData>({
    // Basic Info
    name: "",
    description: "",
    propertyType: "",
    constructionStatus: "",
    completionDate: "",
    address: "",
    city: "",
    state: "",

    // Property Details
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    yearBuilt: "",
    features: [],
    landSize: "",

    // Land Borders
    northBorder: "",
    southBorder: "",
    eastBorder: "",
    westBorder: "",
    landTitle: "",
    surveyPlan: "",

    // Financial Info
    totalValue: "",
    totalTokens: "",
    minInvestment: "1",
    expectedROI: "",

    // Geolocation
    latitude: "",
    longitude: "",
    accuracy: "",
    locationMethod: "",

    // Documents
    images: [],
    documents: [],
    documentTypes: [],
  });

  const verifyCurrentStep = () => {
    let schema;

    if (currentStep === 1) schema = basicSchema;
    if (currentStep === 2) schema = propertyDetailSchema;
    if (currentStep === 3) schema = financialInforSchema;
    if (currentStep === 4) schema = geolocationSchema;
    if (currentStep === 5) schema = documentsSchema;

    if (!schema) return true;

    const result = schema.safeParse(propertyData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      for (const [key, val] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        if (val && val.length) newErrors[key] = val[0];
      }

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (verifyCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const result = propertyDataSchema.safeParse(propertyData);

      if (!result.success) {
        const newErrors: Record<string, string> = {};

        for (const [key, val] of Object.entries(
          result.error.flatten().fieldErrors
        )) {
          if (val && val.length) newErrors[key] = val[0];
        }

        setErrors(newErrors);
        alert(newErrors);
        return;
      }

      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onCloseAddPropertyModal();
    setCurrentStep(1);
    setErrors({});

    setPropertyData({
      name: "",
      description: "",
      propertyType: "",
      constructionStatus: "",
      completionDate: "",
      address: "",
      city: "",
      state: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      yearBuilt: "",
      features: [],
      landSize: "",
      northBorder: "",
      southBorder: "",
      eastBorder: "",
      westBorder: "",
      landTitle: "",
      surveyPlan: "",
      totalValue: "",
      totalTokens: "",
      minInvestment: "1",
      expectedROI: "", 
      latitude: "",
      longitude: "",
      accuracy: "",
      locationMethod: "",
      images: [],
      documents: [],
      documentTypes: [],
    });
  };

  useEffect(() => {
    if (isAddPropertyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (propertyData.totalValue) {
      const value = Number.parseFloat(
        propertyData.totalValue.replace(/[^0-9.]/g, "")
      );
      if (!isNaN(value)) {
        setPropertyData((prev) => ({
          ...prev,
          totalTokens: value.toLocaleString(),
        }));
      }
    }
  }, [isAddPropertyOpen, propertyData.totalValue]);

  if (!isAddPropertyOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 select-none flex justify-center items-center z-50">
      <div className="bg-white overflow-hidden p-6 rounded-md w-full max-w-4xl overflow-y-auto max-h-[95vh] relative animate-in fade-in duration-500">
        <button
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-2 text-gray-400"
          onClick={handleClose}
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
          {[1, 2, 3, 4, 5].map((step, index) => (
            <div key={step} className="flex items-center ">
              <div
                className={`w-8 h-8 rounded-full z-10 flex items-center flex-shrink-0 justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-4 h-4 animate-in fade-in zoom-in duration-300" />
                ) : (
                  step
                )}
              </div>
              {index < 4 && (
                <div className=" flex-1  h-1 bg-slate-200  ">
                  <div
                    className={`h-full transition-all duration-700 delay-100 ease-in-out origin-left ${
                      step < currentStep
                        ? "bg-emerald-500 w-full"
                        : "bg-slate-200 w-0"
                    }`}
                  />
                </div>
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

        <AddPropertyForm
          currentStep={currentStep}
          errors={errors}
          setErrors={setErrors}
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />

        <div className="flex justify-between mt-6 pt-6 border-t border-t-slate-200">
          <button
            className={`border border-gray-300 rounded-md cursor-pointer flex justify-center  space-x-5 items-center py-2 px-4 rounded-m
                 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handlePreviousStep}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-auto bg-gradient-to-r  cursor-pointer space-x-2 flex justify-center items-center py-2 px-6 rounded-md from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              <span> Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="ml-auto bg-gradient-to-r  cursor-pointer space-x-2 flex justify-center items-center py-2 px-6 rounded-md from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Property"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
