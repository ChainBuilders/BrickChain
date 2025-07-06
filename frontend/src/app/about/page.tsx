import HeroSecion from "@/components/about/heroSecion";
import React from "react";
import Mission from "../../components/about/mission";
import CoreValues from "../../components/about/coreValues";
import Team from "../../components/about/team";
import WhyBrickChain from "../../components/about/whyBrickChain";
import ReadyToJoin from "../../components/about/readyToJoin";
import OurJourney from "@/components/about/ourJourney";

export default function About() {
  return (
    <div>
     <HeroSecion />
     <Mission />
     <CoreValues />
     <OurJourney />
     <Team />
     <WhyBrickChain />
     <ReadyToJoin />
    </div>
  );
}
