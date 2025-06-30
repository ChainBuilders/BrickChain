import React from 'react'
import Link from 'next/link';

export default function Whitelist() {
  return (
    <div>
        {/* Final CTA */}
      <div className="text-center px-6 py-16 bg-white">
        <h2 className="text-[48px] text-[black] font-bold">Ready to Own Real Estate Your Way?</h2>
        <p className='text-[25px] font-[600] text-stone-500'>Join thousands of nigerians building wealth through tokenization and real estate</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-15">
          <Link href="/properties" className="bg-[#19744d]  text-white font-semibold px-6 py-5 border-2 border-[#19744d] rounded-xl  hover:text-[#19744d] hover:bg-white transition">
              Browse Properties
          
          </Link>
          <Link href="/waitlist" className=" text-[#19744d] bg-transparent border-2 border-[#15b05d] hover:bg-[#19744d]   px-6 py-5 rounded-xl font-semibold hover:text-white  transition">
              Join Our Waitlist
          
          </Link>
        </div>
      </div>    
    </div>
  )
}
