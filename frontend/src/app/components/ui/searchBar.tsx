import React from "react";

export default function SearchBar() {
  return (
    <div className="w-full max-w-[450px] bg-inherit  rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
      <input
        type="text"
        placeholder="Search properties..."
        className="flex-1 p-2 border bg-white border-gray-300 text-[#6f5a0c] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
        Search
      </button>
    </div>
  );
}
