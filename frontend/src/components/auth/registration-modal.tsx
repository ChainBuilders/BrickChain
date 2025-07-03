"use client";

import { useModalStore } from "@/stores/modalStore";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle,
  Loader2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { startTransition, use, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import Label from "../ui/Labal";
import { createAccountAction } from "@/actions/users";
import router from "next/router";
import toast from "react-hot-toast";
import { createSupabaseClient } from "@/auth/client";
import { getErrorMessage } from "@/libs/utils";
import { useRouter } from 'next/navigation';

const supabase = createSupabaseClient();
export function RegistrationModal() {
  const { isRegisterOpen, onCloseRegisterModal, onLoginModal, role } =
    useModalStore();
  const [selectedType, setSelectedType] = useState<
    "investor" | "realtor" | null
  >(role);
  const [step, setStep] = useState(role ? 2 : 1);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nin: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    governmentId: null as File | null,
    companyDocument: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const resetModal = () => {
    setStep(1);
    setSelectedType(role);
    setErrors({});
    setFormData({
      fullName: "",
      nin: "",
      email: "",
      phone: "",
      password: "",
      businessName: "",
      governmentId: null,
      companyDocument: null,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    function isFileTooLarge(file: File | null, maxSizeMB: number = 5): boolean {
      return !!file && file.size > maxSizeMB * 1024 * 1024;
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (selectedType === "investor") {
      if (!formData.nin.trim()) {
        newErrors.nin = "NIN is required";
      } else if (formData.nin.length !== 11) {
        newErrors.nin = "NIN must be 11 digits";
      }
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "company name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "phone number is required";
    }

    if (selectedType === "realtor") {
      if (!formData.governmentId) {
        newErrors.governmentId = "Government-issued ID is required";
      }
      if (!formData.companyDocument) {
        newErrors.companyDocument = "Company document is required";
      }

      if (
        isFileTooLarge(formData.governmentId) ||
        isFileTooLarge(formData.companyDocument)
      ) {
        newErrors.companyDocument =
          "File is too large. Maximum allowed size is 3MB";
        return;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
  if ( !selectedType) return;

  setIsPending(true);
  try {
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("userType", selectedType); // Add user type to form data

    // Create account
    const { errorMessage, userId } = await createAccountAction(form);
    if (errorMessage) throw new Error(errorMessage);

    // Sign in
    const { data: { session }, error: signInError } = 
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

    if (signInError || !session) throw signInError || new Error("Login failed");

    // Save additional user data
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        userData: {
          id: session.user.id,
          email: formData.email,
          userType: selectedType,
          fullName: formData.fullName,
          nin: formData.nin,
          phone: formData.phone,
          businessName: formData.businessName
        }
      }),
    });

    if (!response.ok) throw new Error("Profile save failed");

    // Redirect based on user type
    const dashboardPath = selectedType === "realtor" 
      ? "/realtor-dashboard" 
      : "/investor-dashboard";
    
    router.push(dashboardPath);
    toast.success("Registration complete!");
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    setIsPending(false);
  }
};
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2 && selectedType) {
      setStep(1);
      setSelectedType(null);
      setErrors({});
    }
  };

  function handleClose() {
    onCloseRegisterModal();
    resetModal();
  }

  useEffect(() => {
    if (isRegisterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isRegisterOpen]);

  if (!isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 select-none flex justify-center items-center z-50">
      <div className="bg-white overflow-hidden p-6 rounded-md w-full max-w-2xl overflow-y-auto max-h-[95vh] relative animate-in fade-in duration-500">
        <button
          onClick={handleClose}
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-2 text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-center mb-2">
          {step === 1 ? "Choose Your Path" : `Register as ${selectedType}`}
        </h2>
        <p className="text-center text-gray-600 mb-4">
          {step === 1
            ? "Select how you'd like to join the BrickChain ecosystem"
            : "Fill in your details to get started"}
        </p>

        <div>
          {step === 1 && (
            <div className="grid md:grid-cols-2 pb-6 gap-6 animate-in fade-in duration-500">
              <div
                className={`cursor-pointer p-2 px-5 rounded-sm border border-gray-300  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedType === "investor"
                    ? "ring-1 ring-emerald-500 bg-emerald-50"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => setSelectedType("investor")}
              >
                <div className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl">💼 I'm an Investor</h1>
                  <span className="bg-emerald-100 text-emerald-800 mx-auto text-xs font-semibold p-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-slate-600 font-medium text-[18px]">
                    Start investing in premium Nigerian real estate with as
                    little as ₦10,000
                  </p>
                  <div className="space-y-2 text-sm font-medium text-slate-500 ">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      Low minimum investment
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      Instant liquidity
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      Passive income
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`cursor-pointer transition-all py-3 px-5 rounded-sm border border-gray-300 duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedType === "realtor"
                    ? "ring-1 ring-blue-500 bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
                // onClick={() => setSelectedType("realtor")}
              >
                <div className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r bpprder from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl">🏢 I'm a Realtor</h1>
                  <span className="bg-blue-100 text-blue-800 mx-auto text-xs font-semibold p-1 rounded-full">
                    Professional
                  </span>
                </div>

                <div className="text-center space-y-3  ">
                  <p className="text-slate-600 font-medium text-[18px]">
                    List and tokenize your properties on our blockchain platform
                  </p>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      List properties
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      Earn commissions
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      Manage listings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {step === 2 && selectedType && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>
            </div>

            {selectedType === "investor" && (
              <div>
                <Label htmlFor="nin">
                  NIN (National Identification Number) *
                </Label>
                <Input
                  id="nin"
                  value={formData.nin}
                  onChange={(e) => handleInputChange("nin", e.target.value)}
                  placeholder="Enter your 11-digit NIN"
                  maxLength={11}
                  className={errors.nin ? "border-red-500" : ""}
                />
                {errors.nin && (
                  <p className="text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nin}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number (optional)"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {selectedType === "realtor" && (
              <>
                <div>
                  <Label htmlFor="businessName">Business Name or Company</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    placeholder="Your company name"
                    className={errors.businessName ? "border-red-500" : ""}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.businessName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="governmentId">
                    Upload Government-issued ID *
                  </Label>
                  <div className="mt-1">
                    <Label
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                        errors.governmentId
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          {formData.governmentId
                            ? formData.governmentId.name
                            : "Click to upload ID document"}
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or PDF (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="governmentId"
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "governmentId",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </Label>
                  </div>
                  {errors.governmentId && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.governmentId}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyDocument">
                    Upload Company Document (CAC or License) *
                  </Label>
                  <div className="mt-1">
                    <Label
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                        errors.companyDocument
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          {formData.companyDocument
                            ? formData.companyDocument.name
                            : "Click to upload company document"}
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or PDF (MAX. 5MB)
                        </p>
                      </div>
                      <Input
                        id="companyDocument"
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "companyDocument",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </Label>
                  </div>
                  {errors.companyDocument && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyDocument}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between border-gray-300 pt-6 border-t">
          {step > 1 && selectedType && (
            <button
              className="border border-gray-300 py-1 px-3 rounded-md"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {step === 1 && (
            <button
              className={`ml-auto bg-gradient-to-r flex justify-center items-center py-2 px-6 rounded-md from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white
                 ${
                   !selectedType
                     ? "opacity-50 cursor-not-allowed hover:from-emerald-500 hover:to-teal-600"
                     : ""
                 }`}
              onClick={handleNext}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
          {step === 2 && (
            <button
              onClick={handleSubmit}
              className="ml-autoflex text-sm font-medium flex justify-center items-center py-2 px-6 rounded-md text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                " Complete Registration"
              )}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              className="text-emerald-600 cursor-pointer  hover:text-emerald-500 font-medium"
              onClick={onLoginModal}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
