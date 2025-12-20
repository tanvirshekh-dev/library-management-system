import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  MdDashboard, MdBook, MdAssignmentReturn, 
  MdCategory, MdPeople, MdPerson, MdLogout 
} from "react-icons/md";
import MupiImage from "../../assets/মুন্সীগঞ্জ_পলিটেকনিক_ইনস্টিটিউট.jpg"

const menuItems = [
  { path: "/", label: "Dashboards", icon: MdDashboard },
  { path: "/books", label: "Book Management", icon: MdBook },
  { path: "/issue", label: "Issue & Return", icon: MdAssignmentReturn },
  { path: "/categories", label: "Categories", icon: MdCategory, hasSub: true },
  { path: "/students", label: "Student Management", icon: MdPeople },
  { path: "/profile", label: "Profile", icon: MdPerson },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo Area */}
      <div className="p-6 flex justify-center border-b border-gray-50">
        <div className="w-24 h-24">
          <img src={MupiImage} alt="Library Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-[#004D61] text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="text-xl shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.hasSub && <span className="text-[10px]">▶</span>}
          </NavLink>
        ))}
      </nav>

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