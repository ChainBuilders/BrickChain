import Button from "../ui/Button";
import Card from "../ui/Card";
import {
  Gem,
  Home,
  Wallet,
  Smartphone,
  BarChart3,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const stepsData = [
    {
      title: "Tokenize",
      description: "Property owners mint tokens (1 token = ₦1,000 of equity).",
      icon: <Gem color="white" size={30} />, // 💎
      color: "#a602e7",
      step: "step 1",
      subText: "Minimum investment ₦10,000",
    },
    {
      title: "Invest",
      description:
        "Buy tokens with USDT/USDC or cNGN. Own fractions hassle-free.",
      icon: <Wallet color="white" size={30} />, // 💰
      color: "#4696ff",
      step: "step 2",
      subText: "Instant ownership verification",
    },
    {
      title: "Earn",
      description:
        "Stake tokens to earn 5% annual yield or trade on our P2P market.",
      icon: <BarChart3 color="white" size={30} />, // 📈
      step: "step 3",
      subText: "Up to 12% annual return",
      color: "#ff5546",
    },
  ];

  return (
    <section className="py-12 px-4 text-center bg-gradient-to-br from-[#fafafa] to-[#cee9ecd4]">
      <h2 className="text-[40px]  font-[600] text-black">
        Own Real Estate in 3 Simple Steps
      </h2>
      <p className="text-stone-500 text-[18px] font-[600] mb-10">
        Get started in minutes, not months
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 md:px-10 lg:px-20 w-full mx-auto">
        {stepsData.map((step, index) => (
          <Card
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            color={step.color}
            step={step.step}
            subText={step.subText}
          />
        ))}
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          link="#"
          className="mt-8 lg:w-[250px] hover:cursor-pointer flex justify-center items-center  py-3 bg-gradient-to-r from-[#34b792] w-[180px] to-[#328b79] hover:border-white border-2 border- text-white"
        >
            <span>

          Get Started Today
            </span>
            <ArrowRight color="white" size={30} />
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
