import React, { useState } from "react"; // Added useState
import { NavLink, useLocation } from "react-router-dom"; // Added useLocation
import {
  MdDashboard,
  MdBook,
  MdAssignmentReturn,
  MdCategory,
  MdPeople,
  MdPerson,
  MdLogout,
  MdExpandMore, // Added MdExpandMore
} from "react-icons/md";
import MupiImage from "../../assets/মুন্সীগঞ্জ_পলিটেকনিক_ইনস্টিটিউট.jpg";

// 1. Fixed: lowercase 'children', added quotes to "Categories"
const menuItems = [
  { path: "/", label: "Dashboards", icon: MdDashboard },
  { path: "/books", label: "Book Management", icon: MdBook },
  { path: "/issue", label: "Issue & Return", icon: MdAssignmentReturn },
  {
    label: "Categories", // Fixed: Added quotes
    icon: MdCategory,
    children: [
      // Fixed: Lowercase to match logic below
      { path: "/categories/department", label: "Add Department" },
      { path: "/categories/semester", label: "Add Semester" },
    ],
  },
  { path: "/students", label: "Student Management", icon: MdPeople },
  { path: "/profile", label: "Profile", icon: MdPerson },
];

export function Sidebar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0">
      {/* Logo Area */}
      <div className="p-6 flex justify-center border-b border-gray-50">
        <div className="w-24 h-24">
          <img
            src={MupiImage}
            alt="Library Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const hasChildren = !!item.children;

            if (hasChildren) {
              return (
                <div key={index} className="flex flex-col">
                  {/* Category Header Button */}
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isCategoryOpen
                        ? "bg-[#003f5c] text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <MdExpandMore
                      className={`text-xl transition-transform ${
                        isCategoryOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {/* Sub-menu Items */}
                  {isCategoryOpen && (
                    <div className="mt-2 ml-2 p-2 border border-slate-100 rounded-lg space-y-1 shadow-sm">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `
                            flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors
                            ${
                              isActive
                                ? "bg-[#98e1ff] text-[#003f5c]"
                                : "text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          {/* Indicator Dot */}
                          <span className="w-1.5 h-1.5 bg-black rounded-full" />
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Regular Menu Items
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg font-medium transition-all
                  ${
                    isActive
                      ? "text-[#003f5c] bg-slate-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                <item.icon className="text-xl" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>


      {/* Logout at Bottom */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium">
          <MdLogout className="text-xl" />
          Log out
        </button>
      </div>
    </aside>
  );
}
