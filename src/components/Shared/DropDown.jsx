import React, { useState } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64 font-sans">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#003f5c] text-white px-4 py-3 rounded-t-xl transition-all"
      >
        <div className="flex items-center gap-3">
          {/* Custom Icon (Categories icon from image) */}
          <LayoutGrid size={20} />
          <span className="text-lg font-medium">Categories</span>
        </div>
        
        {/* Animated Arrow Icon */}
        <ChevronDown 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          size={22} 
        />
      </button>

      {/* Dropdown Items (Collapsible) */}
      <div 
        className={`overflow-hidden transition-all duration-300 border-x border-b border-slate-100 rounded-b-xl shadow-sm bg-white ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="py-4 px-8 space-y-4">
          <li className="list-disc text-blue-900 hover:text-blue-700 cursor-pointer text-lg font-medium">
            Add Department
          </li>
          <li className="list-disc text-blue-900 hover:text-blue-700 cursor-pointer text-lg font-medium">
            Add Semester
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;