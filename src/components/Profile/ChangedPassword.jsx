import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChangedPassword = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  
  // toggle password 
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // previous page
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl p-10 rounded-xl border-none">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#003d4d] mb-8">
            Change password
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-2 w-1/2">
            <Label htmlFor="old-password" className="text-[#003d4d] font-bold text-base">
              Old Password
            </Label>
            <div className="relative">
              <Input
                id="old-password"
                type={showOld ? "text" : "password"}
                placeholder="******"
                className="h-12 bg-white border-gray-300 pr-10 focus-visible:ring-[#003d4d]"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-[#003d4d] font-bold text-base">
                New password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  placeholder="******"
                  className="h-12 bg-white border-gray-300 pr-10 focus-visible:ring-[#003d4d]"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#003d4d] font-bold text-base">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="******"
                  className="h-12 bg-white border-gray-300 pr-10 focus-visible:ring-[#003d4d]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-center pt-2">
            <Link 
              to="/profile/forgot-password" 
              className="text-gray-500 hover:text-[#003d4d] underline text-sm underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-44 h-12 border-gray-300 text-orange-500 font-bold hover:bg-orange-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-44 h-12 bg-[#003d4d] hover:bg-[#002a35] text-white font-bold"
            >
              Change
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangedPassword;