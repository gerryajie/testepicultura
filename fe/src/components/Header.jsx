import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-blue-800 text-white flex justify-between items-center px-6 py-3 shadow">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="FTL" className="w-8 h-8" />
        <h1 className="font-semibold text-lg">iMeeting</h1>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5" />
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <span>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
