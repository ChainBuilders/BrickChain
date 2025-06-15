
import Button from "../ui/Button";
import Card from "../ui/Card";
import { Gem, Home, Wallet, Smartphone, BarChart3, RefreshCcw } from 'lucide-react';

const HowItWorks = () => {
    const stepsData = [
  {
    title: 'Tokenize',
    description: 'Property owners mint tokens (1 token = ₦1,000 of equity).',
    icon: <Gem color="#0f6a09" size={30} />, // 💎
  },
  {
    title: 'Invest',
    description: 'Buy tokens with USDT/USDC or cNGN. Own fractions hassle-free.',
    icon: <Wallet color="#0f6a09" size={30} />, // 💰
  },
  {
    title: 'Earn',
    description: 'Stake tokens to earn 5% annual yield or trade on our P2P market.',
    icon: <BarChart3 color="#0f6a09" size={30} />, // 📈
  },
];

  return (
    <section className="py-12 px-4 text-center bg-[#0f6a09]">
      <h2 className="text-[40px] font-bold mb-8 text-white">
        Own Real Estate in 3 Steps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stepsData.map((step, index) => (
          <Card
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
      <div>
        <Button link="#" className="mt-8 w-[250px] py-3 bg-[#877512] hover:bg-[#6f5a0c] hover:border-white border-2 border- text-white">
          Get Started Today
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
