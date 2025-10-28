import React from "react";
import { Bell } from "lucide-react";
import logoFTL from "../assets/logo-ftl.png";

const Topbar = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full h-14 bg-gradient-to-r from-gray-900 to-teal-800 text-white flex items-center justify-between px-6 shadow z-50"
    >
      {/* 🔹 Logo FTL iMeeting */}
      <div className="flex items-center gap-2 ml-14"> 
        {/* 👈 memberi jarak agar tidak tertutup sidebar */}
        <img
          src={logoFTL}
          alt="FTL Logo"
          className="h-6 w-auto object-contain"
        />
        <span className="font-semibold text-sm tracking-wide">iMeeting</span>
      </div>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-6">
        <button className="hover:text-gray-200 transition">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/30"
            alt="User"
            className="w-8 h-8 rounded-full border border-white"
          />
          <span className="text-sm font-medium">John Doe</span>
          <svg
            className="w-4 h-4 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
