import { Twitter, Linkedin, Send } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 p-15">
      {/* Footer */}
      <div className="flex flex-col w-full md:flex-row border-b border-gray-800 pb-6 mb-6">
        <div className="flex w-full">
          <div className="flex flex-col  w-full p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">BrickChain</h2>
            <p className="text-gray-400 mb-4">
              Democratizing real estate investment through blockchain
              technology.
            </p>
            <div className="flex gap-4 ">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="hover:text-green-500" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="hover:text-green-500" />
              </Link>
              <Link
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="hover:text-green-500" />
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <h1 className="text-white font-semibold">Platform</h1>
            <ul className="text-stone-400 space-y-2 mt-4">
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Properties</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Dashboard</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Marketplace</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Analytics</Link>
              </li>
            </ul>
          </div>
          

          {/* Copyright */}
          {/* <div className="text-center sm:text-right text-gray-400">
            © 2024 <span className="font-semibold">BrickChain</span>. Real estate, democratized.
          </div> */}
        </div>
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <h1 className="text-white font-semibold">Company</h1>
            <ul className="text-stone-400 space-y-2 mt-4">
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>About</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Blog</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Career</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col">
            <h1 className="text-white font-semibold">Legal</h1>
            <ul className="text-stone-400 space-y-2 mt-4">
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Terms</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Privacy</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Security</Link>
              </li>
              <li>
                <Link className="hover:text-[#47d9b0]" href={"#"}>Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p className="mb-4 md:mb-0">
          © 2024 BrickChain. All rights reserved.
        </p>
        <p>
          Built with ❤️ by{" "}
          <Link
            href="#"
            className="text-[#47d9b0] hover:underline"
            target="_blank"
            >ChainBUilders</Link>
            </p>
      </div>
    </footer>
  );
};

export default FooterSection;
