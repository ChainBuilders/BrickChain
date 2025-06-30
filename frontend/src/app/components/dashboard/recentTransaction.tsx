import { recentTransactions } from '@/data/myProperties'
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import React from 'react'

interface Transaction {
  direction: string;
  type: string;
  property: string;
  amount: string | number;
  date: string;
}

interface RecentTransactionProps {
  user: any;
  data: any;
}

export default function RecentTransaction({ user, data }: RecentTransactionProps) {
  const isRealtor = user === 'realtor';

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="font-semibold tracking-tight text-lg">Recent Transactions</h1>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {isRealtor
            ? data?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="p-2 rounded-full bg-[#cbebff]">
                      <Activity />
                    </span>
                    <div>
                      <p className="text-md font-bold text-slate-900">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-md text-slate-500">{item.title}</p>
                    <p className="text-md text-slate-500">{item.date}</p>
                  </div>
                </div>
              ))
            : recentTransactions?.map((transaction: Transaction, index: number) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`p-2 rounded-full ${
                        transaction.direction === 'up' ? 'bg-[#cbebff]' : 'bg-[#abf7da]'
                      }`}
                    >
                      {transaction.direction === 'up' ? (
                        <ArrowUpRight color="#1695e4" />
                      ) : (
                        <ArrowDownRight color="#09ba76" />
                      )}
                    </span>
                    <div>
                      <p className="text-md font-bold text-slate-900">{transaction.type}</p>
                      <p className="text-md text-slate-500">{transaction.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-md font-bold text-slate-900">{transaction.amount}</p>
                    <p className="text-md text-slate-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
