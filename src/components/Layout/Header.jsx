// import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminImage from "../../assets/logo.png"
import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
      <h1 className="text-xl font-bold text-gray-800">Library Management System</h1>
      
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="p-2 text-black hover:bg-gray-100 rounded-lg relative">
          <Bell />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l pl-6">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={AdminImage} alt="Wilson" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900 leading-none">Tanvir Shekh</p>
            <p className="text-[11px] text-gray-400 mt-1">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}