import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import  AdminImg  from "../assets/self-removebg-preview.png"

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: "Tanvir Shekh",
    email: "tanvirshekh.dev@gmail.com",
    phone: "0123456789",
    password: "MUPI@LibraryManagement"
  });

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-[#001f3f]">Admin Profile</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-lg">
              {/* Replace with actual image path */}
              <AvatarImage src={AdminImg} alt="Admin" className="object-cover" />
              <AvatarFallback className="rounded-lg bg-slate-100">
                <User className="h-10 w-10 text-slate-400" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{profile.name}</h3>
              <p className="text-slate-500 text-sm">tanvirshekh.dev@gmail.com</p>
            </div>
          </div>
          
          <Button className="bg-[#003f5c] hover:bg-[#002d42] px-8 py-6 text-lg rounded-lg">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-4">
        {/* Admin Name - Full Width in Design */}
        <div className="space-y-3 md:col-span-2">
          <Label className="text-lg font-bold text-[#001f3f]">Admin Name</Label>
          <Input 
            value={profile.name}
            className="h-14 border-slate-200 bg-white text-slate-600 text-base focus-visible:ring-[#003f5c]"
            readOnly
          />
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <Label className="text-lg font-bold text-[#001f3f]">Email</Label>
          <Input 
            value={profile.email}
            className="h-14 border-slate-200 bg-white text-slate-600 text-base"
            readOnly
          />
        </div>

        {/* Contact Number Field */}
        <div className="space-y-3">
          <Label className="text-lg font-bold text-[#001f3f]">Contact Number</Label>
          <Input 
            value={profile.phone}
            className="h-14 border-slate-200 bg-white text-slate-600 text-base"
            readOnly
          />
        </div>

        {/* Password Section with Change Button */}
        <div className="space-y-3 md:col-span-2">
          <Label className="text-lg font-bold text-[#001f3f]">Password</Label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input 
                type={showPassword ? "text" : "password"}
                value={profile.password}
                className="h-14 border-slate-200 bg-white text-slate-600 text-base pr-12"
                readOnly
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button className="bg-[#003f5c] hover:bg-[#002d42] h-14 px-12 text-lg rounded-lg">
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}