import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "../components/landingPage/navBar";
import FooterSection from "../components/landingPage/footer";
import { AddPropertyModal } from "../components/AddProperty/add-property-modal";
import { AuthProvider } from "@/context/authContext";
import InvestmentModal from "@/components/investment/invest-modal";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrickChain",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <NavBar />
          {children}
          <FooterSection />
          <AddPropertyModal />
          <InvestmentModal />
        </AuthProvider>
      </body>
    </html>
  );
}
