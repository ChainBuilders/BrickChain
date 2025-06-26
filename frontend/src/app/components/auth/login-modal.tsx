"use client";

import { useModalStore } from "@/stores/modalStore";
import { AlertCircle, ArrowRight, Eye, EyeOff, X } from "lucide-react";
import { Input } from "../ui/Input";
import Label from "../ui/Labal";
import { useState } from "react";
// import { useState } from "react";

export function LoginModal() {
  const { isLoginOpen, onCloseLoginModal,onRegisterModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be upto 8 or more";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const handleClose = () => {
    onCloseLoginModal();
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black/80">
      <div className="bg-white  relative rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in duration-500">
        <button
          onClick={handleClose}
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-3 text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
          <p className="text-center">Sign in to your BrickChain account</p>
        </div>

        <div className="space-y-6 mt-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter your password"
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-emerald-600 hover:text-emerald-500">
              Forgot password?
            </a>
          </div>

          <button
            className="w-full bg-gradient-to-r flex justify-center items-center py-2 px-6 rounded-md text-white from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <button
                className="text-emerald-600  hover:text-emerald-500 font-medium"
                onClick={() => onRegisterModal()}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
