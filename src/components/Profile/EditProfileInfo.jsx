import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditProfileInfo = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 
  const [open, setOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null); 

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl p-8 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#003d4d] mb-6">
            Edit Profile Info
          </DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#003d4d] font-bold">Name</Label>
              <Input id="name" defaultValue="Md. Tanvir Shekh" className="bg-gray-50 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#003d4d] font-bold">Email</Label>
              <Input id="email" type="email" defaultValue="tanvirshekh.dev@gmail.com" className="bg-gray-50 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-[#003d4d] font-bold">Contact Number</Label>
              <Input id="contact" defaultValue="01707*******" className="bg-gray-50 h-12" />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="space-y-4">
            <Label className="text-[#003d4d] font-bold">Profile Image</Label>
            
            {/* Input Hidden */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Upload section */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 bg-white">
              <UploadCloud className="w-10 h-10 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Drop file or browse</p>
              <p className="text-xs text-gray-400">Format: .jpeg, .png & Max file size: 25 MB</p>
              <Button
                type="button"
                onClick={handleBrowseClick}
                className="bg-[#003d4d] text-white hover:bg-[#002a35] mt-2 h-9 px-6"
              >
                Browse Files
              </Button>
            </div>

            {/* Preview Image */}
            <div className="relative w-40 h-24 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute right-1 top-1 text-red-500 bg-white/80 rounded-full p-0.5 hover:bg-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                
                <div 
                  className="w-full h-full opacity-20" 
                  style={{
                    backgroundImage: `repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-40 h-12 border-gray-300 text-red-500 font-bold hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-40 h-12 bg-[#003d4d] hover:bg-[#002a35] text-white font-bold"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileInfo;