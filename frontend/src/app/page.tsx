import ListingsSection from "./components/landingPage/featuredProperty";
import Hero from "./components/landingPage/hero";
import HowItWorks from "./components/landingPage/howitWorks";
import ProblemsAndSolution from "./components/landingPage/problems&solution";
import Referral from "./components/landingPage/referral";
import WhyBlockChain from "./components/landingPage/whyBlockChain";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProblemsAndSolution />
      <HowItWorks />
      <ListingsSection />
      <WhyBlockChain />
      <Referral />
    </div>
  );
}
