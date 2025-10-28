import React from "react";
import { Home, User } from "lucide-react";

const Sidebar = () => {
  return (
    <aside
      className="fixed top-14 left-0 w-16 bg-white shadow-sm flex flex-col items-center py-6 space-y-6 border-r border-gray-200 z-40"
    >
      {/* 🔹 Home Button */}
      <button className="w-10 h-10 flex items-center justify-center bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition">
        <Home size={20} />
      </button>

      {/* 🔹 User Button */}
      <button className="w-10 h-10 flex items-center justify-center text-teal-700 hover:bg-gray-100 rounded-lg transition">
        <User size={20} />
      </button>
    </aside>
  );
};

export default Sidebar;
