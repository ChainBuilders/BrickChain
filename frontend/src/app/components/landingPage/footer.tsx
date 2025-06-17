import { Twitter, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Final CTA */}
      <div className="text-center px-6 py-16 bg-white">
        <h2 className="text-3xl text-[#0f6a09] font-bold mb-6">Ready to Own Real Estate Your Way?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/properties" className="bg-[#0f6a09] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#c6f8c2] hover:text-[#0f6a09] transition">
              Browse Properties
          
          </Link>
          <Link href="/waitlist" className="bg-[#c6f8c2] text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-[#0f6a09] hover:text-white  transition">
              Join Our Waitlist
          
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-10 border-t border-gray-700 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center sm:justify-center">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-green-500" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="hover:text-green-500" />
            </Link>
            <Link href="https://t.me" target="_blank" rel="noopener noreferrer">
              <Send className="hover:text-green-500" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right text-gray-400">
            © 2024 <span className="font-semibold">BrickChain</span>. Real estate, democratized.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
