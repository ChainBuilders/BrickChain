import {
  Plus,
  Download,
  Eye,
  UserPlus,
  Mail,
  SquareStack,
  Search,
  Goal,
  Text,
  Users,
} from "lucide-react";
import React from "react";

export default function QuickAction() {
  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <h1 className="font-semibold tracking-tight text-lg">Quick Action</h1>
        </div>

        <div className="p-6 pt-0 space-y-3">
          <button className="inline-flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-md px-4 py-2 text-white h-10 font-medium outline-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
            <Search color="white" /> <span>Explore New Properties</span>
          </button>
          <button className="inline-flex items-center justify-center gap-2 w-full border border-stone-400 whitespace-nowrap rounded-md px-4 py-2 hover:bg-slate-100 h-10 font-medium outline-none text-black">
            <Goal color="black" /> <span>Set Investment Goal</span>
          </button>
          <button className="inline-flex items-center justify-center gap-2 w-full border border-stone-400 whitespace-nowrap rounded-md px-4 py-2 hover:bg-slate-100 h-10 font-medium outline-none text-black">
            <Text color="Black" /> <span>Download Tet Document</span>
          </button>
          <button className="inline-flex items-center justify-center gap-2 w-full border border-stone-400 whitespace-nowrap rounded-md px-4 py-2 hover:bg-slate-100 h-10 font-medium outline-none text-black">
            <Users color="black" /> <span> Refer Friends & earn</span>
          </button>
        </div>
      </div>
    </>
  );
}
