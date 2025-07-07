import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle,
  CreditCard,
  DollarSign,
  Info,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";
import Label from "../ui/Labal";
import { Input } from "../ui/Input";
import { useModalStore } from "@/stores/modalStore";
import { useRouter } from "next/navigation";

// type InvestNowProps = {
//   currentStep: number;
// };

const quickAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

function InvestmentForm() {
  const router = useRouter();

  const onCloseInvestNowModal = useModalStore(
    (state) => state.onCloseInvestNowModal
  );
  const [currentStep, setCurrentStep] = useState(1);

  const [investmentAmount, setInvestmentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | null>(
    null
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  const exchangeRate = 1650;
  const usdAmount = investmentAmount
    ? (Number(investmentAmount) / exchangeRate).toFixed(2)
    : "0.00";

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInvestmentSubmit = async () => {
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setCurrentStep(3);
  };

  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              How much would you like to invest?
            </h3>
            <p className="text-slate-600">Minimum investment: {"₦10,000"}</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount mb-2">Investment Amount (₦)</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={investmentAmount.toLocaleString()}
                  onChange={(e) =>
                    setInvestmentAmount(e.target.value.toLocaleString())
                  }
                  className="text-lg h-12 pl-8"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                  ₦
                </span>
              </div>
            </div>

            {/* USD Conversion Display */}
            {investmentAmount && (
              <div className="bg-blue-50 border-blue-200 rounded-md">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        USD Equivalent:
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-900">
                        ${usdAmount}
                      </div>
                      <div className="text-xs text-blue-600">
                        Rate: $1 = ₦{exchangeRate.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setInvestmentAmount(amount.toString())}
                  className="text-sm border border-slate-200 py-1 rounded-md cursor-pointer"
                >
                  ₦{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`w-full bg-gradient-to-r from-emerald-500 flex items-center justify-center rounded-md py-2 text-white to-teal-600 ${
              !investmentAmount || Number(investmentAmount) < 10000
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              Choose Payment Method
            </h3>
            <p className="text-slate-600">
              Investing ₦{Number.parseFloat(investmentAmount).toLocaleString()}{" "}
              (${usdAmount})
            </p>
          </div>

          <div className="space-y-4">
            {/* div Payment Option */}
            <div
              className={`cursor-pointer transition-all border border-slate-200 rounded-md ${
                paymentMethod === "card"
                  ? "ring-2 ring-emerald-500 bg-emerald-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Credit/Debit</h4>
                    <p className="text-sm text-slate-600">
                      Pay with Visa, Mastercard, or Verve
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 py-1 text-xs  font-semibold px-3 rounded-full">
                    Instant
                  </div>
                </div>
              </div>
            </div>

            {/* USDT Payment Option */}
            <div
              className={`cursor-pointer transition-all border border-slate-200 rounded-md ${
                paymentMethod === "crypto"
                  ? "ring-2 ring-emerald-500 bg-emerald-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setPaymentMethod("crypto")}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">USDT (Cryptocurrency)</h4>
                    <p className="text-sm text-slate-600">
                      Pay ${usdAmount} USDT via Web3 wallet
                    </p>
                  </div>
                  <div className="py-1 text-xs  font-semibold px-3 rounded-full bg-orange-100 text-orange-900">
                    Web3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Details */}

          {paymentMethod === "card" && (
            <div className="bg-blue-50 border-blue-200 rounded-md">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1 ">Payment Details:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Secure payment processing via Paystack</li>
                      <li>• Instant confirmation and token allocation</li>
                      <li>• 2.5% processing fee applies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "crypto" && (
            <div className="bg-orange-50 border-orange-200 rounded-md">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="text-sm text-orange-700">
                    <p className="font-medium mb-1">Payment Details:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Pay exactly ${usdAmount} USDT</li>
                      <li>• Supports Ethereum, BSC, & Polygon networks</li>
                      <li>• Lower fees than traditional payments</li>
                      <li>• Instant blockchain confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          {/* <div className="flex items-start space-x-2">
            <Checkbox
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setAgreedToTerms(checked as boolean)
              }
            />
            <Label
              htmlFor="terms"
              className="text-sm text-slate-600 leading-relaxed"
            >
              I agree to the{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Investment Agreement
              </a>
              . I understand the risks involved in real estate investment.
            </Label>
          </div> */}

          <div className="flex  items-center justify-between ">
            <button
              onClick={handleBack}
              className="flex items-center cursor-pointer px-4 justify-center rounded-md py-2 border border-slate-200 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={handleInvestmentSubmit}
              className={`bg-gradient-to-r flex  items-center cursor-pointer justify-center px-4  rounded-md py-2 text-white from-emerald-500 to-teal-600 ${
                !paymentMethod || processing
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {processing ? "Processing..." : "Complete Investment"}
              {!processing && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Investment Successful!
            </h3>
            <p className="text-slate-600">
              You've successfully invested ₦
              {Number.parseFloat(investmentAmount).toLocaleString()} in{" "}
              {/* {property?.name} */}
              property?.name
            </p>
          </div>

          <div className="bg-emerald-50 border-emerald-200">
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Investment Amount:</span>
                <span className="font-semibold">
                  ₦{Number.parseFloat(investmentAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>USD Equivalent:</span>
                <span className="font-semibold">${usdAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Method:</span>
                <span className="font-semibold">
                  {paymentMethod === "card" ? "CARD" : "USDT"}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span>Expected Annual Return:</span>
                <span className="font-semibold text-emerald-600">
                  ₦
                  {(
                    Number.parseFloat(investmentAmount) * 0.085
                  ).toLocaleString()}
                </span>
              </div> */}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                onCloseInvestNowModal();
                router.push("/investor-dashboard");
              }}
              className="w-full bg-gradient-to-r py-2 px-4  rounded-md text-white  from-emerald-500 to-teal-600"
            >
              View in Dashboard
            </button>
            <button
              onClick={onCloseInvestNowModal}
              className="w-full bg-transparent border border-slate-200 hover:bg-slate-100 rounded-md py-2 px-4"
            >
              Close
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default InvestmentForm;
