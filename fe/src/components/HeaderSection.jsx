import React from "react";
import { ArrowLeft } from "lucide-react";

const HeaderSection = ({ title, subtitle, onBack }) => {
  return (
    <div className="flex items-center gap-3 mb-5 mt-4">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center bg-teal-700 text-white rounded-md hover:bg-teal-800 transition"
      >
        <ArrowLeft size={18} />
      </button>
      <div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeaderSection;
