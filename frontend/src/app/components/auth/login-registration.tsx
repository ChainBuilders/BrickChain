"use client";

import { useModalStore } from "@/stores/modalStore";
import { LogIn, UserPlus, X } from "lucide-react";

export function LoginRegisterPrompt() {
  const { isLoginPromptOpen, onLoginModal, onRegisterModal, onClose } =
    useModalStore();

  if (!isLoginPromptOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black/80">
      <div className="bg-white  relative rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in duration-500">
        <button
          onClick={onClose}
          className="absolute top-2 cursor-pointer border-2 border-gray-300 rounded-md p-[2px] right-3 text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome to BrickChain</h2>
          <p className="text-slate-500 mt-1">
            Choose how you'd like to continue
          </p>
        </div>

        <div className="space-y-4">
          {/* Login Card */}
          <div
            className="cursor-pointer p-6 rounded-sm border  border-gray-300   text-center transition-all hover:shadow-md hover:border-gray-400 hover:-translate-y-1 hover:bg-slate-50"
            onClick={onLoginModal}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">I have an account</h3>
            <p className="text-slate-600 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Register Card */}
          <div
            className="cursor-pointer hover:border-gray-400  rounded-sm border border-gray-300   p-6 text-center transition-all hover:shadow-md hover:-translate-y-1 hover:bg-slate-50"
            onClick={() => onRegisterModal()}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">I'm new here</h3>
            <p className="text-slate-600 text-sm">
              Create an account to get started
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
