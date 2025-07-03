"use client";

import React from "react";
import { BarChart3, FileText, Plus, Users } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";

function QuickAction() {
  const onAddPropertyModal = useModalStore((state) => state.onAddPropertyModal);
  const quickActions = [
    {
      title: "Add Property",
      description: "List a new property for tokenization",
      icon: Plus,
      action: onAddPropertyModal,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      title: "View Analytics",
      description: "Check detailed performance metrics",
      icon: BarChart3,
      action: () => alert("Analytics coming soon!"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Manage Documents",
      description: "Upload and organize property documents",
      icon: FileText,
      action: () => alert("Document management coming soon!"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Investor Relations",
      description: "Communicate with your investors",
      icon: Users,
      action: () => alert("Investor relations coming soon!"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="border-0 bg-white p-3 md:p-6 rounded-md shadow-lg animate-in slide-in-from-right duration-700 delay-100">
      <div>
        <h1 className="text-xl font-semibold mb-6">Quick Actions</h1>
      </div>
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="w-full justify-start h-auto p-3 hover:bg-slate-50 font-medium cursor-pointer  rounded-md  py-2 px-4 flex items-center  gap-3"
            onClick={action.action}
          >
            <div
              className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mr-3`}
            >
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium  text-slate-900">{action.title}</div>
              <div className="text-xs font-medium text-slate-600">
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickAction;
