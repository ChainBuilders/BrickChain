import { Download } from "lucide-react";
import React from "react";

export default function Documents() {
    const propertyDocuments = [
  {
    name: "Property Title",
    type: "PDF",
    size: "2.4 MB",
    action: "Download"
  },
  {
    name: "Survey Plan",
    type: "PDF",
    size: "1.8 MB",
    action: "Download"
  },
  {
    name: "Building Approval",
    type: "PDF",
    size: "1.2 MB",
    action: "Download"
  },
  {
    name: "Rental Agreement Template",
    type: "PDF",
    size: "856 KB",
    action: "Download"
  }
];
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-«ra»-trigger-documents"
      id="radix-«ra»-content-documents"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-6"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900">Property Documents</h3>
        <p className="text-slate-600">
          All legal documents and certifications for this property
        </p>
        <div className="space-y-3">
{propertyDocuments && propertyDocuments.map((document, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Download color="red" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{document.name}</div>
                <div className="text-sm text-slate-600 space-x-2"><span>{document.type}</span> • <span>{document.size}</span></div>
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium  bg-white hover:bg-accent hover:bg-amber-50 border border-stone-200 h-9 rounded-md px-3">
              <Download/>
              Download
            </button>
          </div>
))}
        </div>
      </div>
    </div>
  );
}
