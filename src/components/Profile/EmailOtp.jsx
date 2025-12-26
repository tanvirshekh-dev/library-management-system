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
            Enter OTP
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-[#003d4d] font-bold text-base"
              >
                Enter OTP
              </Label>

              <Input
                id="confirm-password"
                placeholder="Enter your register email"
                className="h-12 bg-white border-gray-300 pr-10 focus-visible:ring-[#003d4d]"
              />
            </div>
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
            <Link to={"/profile/set-new-password"}
              type="submit"
              className="px-16 py-3 rounded-lg bg-[#003d4d] hover:bg-[#002a35] text-white font-bold"
            >
              Submit
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangedPassword;
