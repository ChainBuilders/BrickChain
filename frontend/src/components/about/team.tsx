import React from "react";
import TeamCard from "./teamCard";

export default function Team() {
  const teamData = [
    {
      id: 1,
      name: "tali Nanzing Moses",
      about:
        "Full Stack Developer, Smartcontract Developer with 5 years of experience building scalable and sustainable web applications",
      role: "COO & Co Founder Brickchain",
      img: "/tali.jpg",
    },
    {
      id: 2,
      name: "Olujimi Adebakin",
      about:
        "Blockchain Architect with a background in finance and over 8 years of experience designing secure distributed systems.",
      role: "CTO & Co Founder Brickchain",
      img: "/duplex1.jpg",
    },
    {
      id: 3,
      name: "Obed Chukwu",
      about:
        "Real Estate Expert with 10+ years in property management and digital transformation in the real estate sector.",
      role: "CEO & Co Founder Brickchain",
      img: "/duplex2.jpg",
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experienced professionals from finance, technology, and real estate
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData &&
            teamData.map((item) => (
              <TeamCard
                key={item.id}
                name={item.name}
                about={item.about}
                role={item.role}
                img={item.img}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
