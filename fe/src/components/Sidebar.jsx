import { Home, ChevronLeft } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-white border-r flex flex-col items-center py-6">
      <Home className="text-primary w-6 h-6 mb-6" />
      <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
        <ChevronLeft className="text-gray-700 w-4 h-4" />
      </button>
    </div>
  );
};

export default Sidebar;
