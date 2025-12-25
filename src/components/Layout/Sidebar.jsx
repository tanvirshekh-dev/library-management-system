import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdBook,
  MdAssignmentReturn,
  MdCategory,
  MdPeople,
  MdPerson,
  MdLogout,
  MdExpandMore,
} from "react-icons/md";
import MupiImage from "../../assets/মুন্সীগঞ্জ_পলিটেকনিক_ইনস্টিটিউট.jpg";

const menuItems = [
  {
    label: "Book Management",
    icon: MdBook,
    Children: [
      { path: "/books/addbook", label: "Add Book" },
      { path: "/books/editbook", label: "Edit Book" },
    ],
  },
  { path: "/issue", label: "Issue", icon: MdAssignmentReturn },
  { path: "/return", label: " Return", icon: MdAssignmentReturn },
  {
    label: "Categories",
    icon: MdCategory,
    Children: [
      { path: "/categories/department", label: "Add Department" },
      { path: "/categories/semester", label: "Add Semester" },
    ],
  },
  { path: "/students", label: "Student Management", icon: MdPeople },
];

function NavItemWithChildren({ item }) {
  const { pathname } = useLocation();
  
  // চেক করা হচ্ছে বর্তমান পাথটি কি এই আইটেমের কোনো চাইল্ড পাথের সাথে মিলে কি না
  const isChildActive = item.Children.some((child) => pathname === child.path);
  
  const [isOpen, setIsOpen] = useState(isChildActive);

  // URL পরিবর্তন হলে যদি চাইল্ড অ্যাক্টিভ হয়, ড্রপডাউন অটো খুলে যাবে
  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [pathname, isChildActive]);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
          isChildActive 
            ? "bg-[#003f5c] text-white shadow-md" // শুধু তখনই হাইলাইট হবে যখন চাইল্ড অ্যাক্টিভ
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon className="text-xl" />
          <span className="font-medium">{item.label}</span>
        </div>
        <MdExpandMore
          className={`text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : "-rotate-90"
          }`}
        />
      </button>

      {/* সাব-মেনু অ্যানিমেশন সহ */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-2 ml-4 p-2 border-l-2 border-slate-100 space-y-1">
          {item.Children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) => `
                flex items-center gap-3 p-2.5 rounded-md text-sm font-medium transition-colors
                ${isActive ? "bg-[#98e1ff] text-[#003f5c]" : "text-slate-500 hover:bg-slate-50"}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${pathname === child.path ? 'bg-[#003f5c]' : 'bg-slate-300'}`} />
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 overflow-hidden">
      <div className="p-6 flex justify-center border-b border-gray-50">
        <div className="w-24 h-24">
          <img src={MupiImage} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            if (item.Children) {
              return <NavItemWithChildren key={index} item={item} />;
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg font-medium transition-all
                  ${isActive ? "text-white bg-[#00455d] shadow-md" : "text-slate-600 hover:bg-slate-50"}
                `}
              >
                <item.icon className="text-xl" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
          <MdLogout className="text-xl" />
          Log out
        </button>
      </div>
    </aside>
  );
}