import React from 'react'

export default function SummaryCard({topic, amount, duration }: {topic: string, amount: string, duration: React.ReactNode}) {
  return (
    <div className='w-full max-w-[450px] bg-[#f5f6fa] shadow-md hover:scale-105 rounded-2xl p-6 flex flex-col items-start space-y-4 hover:shadow-lg transition'>
      <h3 className='text-[25px] font-semibold text-[#0f6a09]'>{topic}</h3>
      <p className='text-[#877512] font-[600] text-[20px] text-start'>{amount}</p>
      <p className='text-gray-500 text-sm text-end w-full text-[18px] font-[600] '>{duration}</p>

    </div>
  )
}
