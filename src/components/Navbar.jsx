


import React from "react";
import { LogOut, User, Bell, Settings, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg z-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          <div className="flex items-center space-x-2 sm:space-x-3">

            <div className="flex flex-col">
              <span className="text-white text-base sm:text-xl font-bold tracking-tight">
                AppName
              </span>
              <span className="text-indigo-200 text-[10px] sm:text-xs hidden xs:block">
                Dashboard
              </span>
            </div>
          </div>


          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">

            <button className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-indigo-600"></span>
            </button>




            <div className="flex items-center space-x-2 lg:space-x-3 bg-white/10 rounded-lg px-2 lg:px-3 py-2 hover:bg-white/20 transition-all duration-200 cursor-pointer backdrop-blur-sm">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>

            </div>


            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg font-semibold group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="hidden lg:inline text-sm">Logout</span>
            </button>

          </div>


          <div className="flex md:hidden items-center space-x-2">

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 border-t border-indigo-500">
          <div className="px-4 py-3 space-y-3">


            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-3 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">John Doe</p>
                <p className="text-indigo-200 text-xs">Admin</p>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                <Bell className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">Notifications</span>
              </button>

              <button className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                <Settings className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">Settings</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}