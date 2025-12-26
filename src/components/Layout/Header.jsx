import React from 'react';
import { NavLink } from "react-router-dom"; 
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminImage from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
      <h1 className="text-xl font-bold text-gray-800">Library Management System</h1>
      
      <div className="flex items-center gap-6">

        {/* User Profile */}
        <NavLink 
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive 
                ? "bg-[#003d4d] text-white" 
                : "bg-transparent text-gray-700 hover:bg-gray-100" 
            }`
          }
        >
          
          {({ isActive }) => (
            <>
              <Avatar className="h-10 w-10 border border-white">
                <AvatarImage src={AdminImage} alt="Tanvir" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className={`text-sm font-bold leading-none ${isActive ? "text-white" : "text-gray-900"}`}>
                  Tanvir Shekh
                </p>
                <p className={`text-[11px] mt-1 ${isActive ? "text-blue-100" : "text-gray-400"}`}>
                  Admin
                </p>
              </div>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;