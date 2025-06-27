import React from "react";
import Button from "../ui/Button";
import { Coins, Mail, Plus, UserPlus } from "lucide-react";

function QuickAction() {
  return (
    <div className="border-0 bg-white p-6 rounded-md shadow-lg animate-in slide-in-from-right duration-700 delay-100">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Quick Actions</h1>
      </div>
      <div className="space-y-3">
        <Button className="inline-flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-md px-4 py-2 text-white h-10 font-medium outline-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          List New Property
        </Button>

        <button className="w-full font-medium border cursor-pointer hover:bg-gray-50 rounded-md border-gray-300 py-2 px-4 flex items-center justify-center gap-3">
          <UserPlus className="w-4 h-4 mr-2" />
          Manage Client Relationships
        </button>
        <button className="w-full  font-medium border cursor-pointer hover:bg-gray-50 rounded-md border-gray-300 py-2 px-4 flex items-center justify-center gap-3">
          <Mail className="w-4 h-4 mr-2" />
          Marketing Tools
        </button>
        <button className="w-full  font-medium border cursor-pointer hover:bg-gray-50 rounded-md border-gray-300 py-2 px-4 flex items-center justify-center gap-3">
          <Coins className="w-4 h-4 mr-2" />
          Commission Reports
        </button>
      </div>
    </div>
  );
}

export default QuickAction;
