import React, { useState, useMemo } from 'react';
import { Search, Plus, FileEdit } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Demo data

const DEPARTMENT_DATA = [
  { id: 1, name: "Computer Science and Technology", shortName: "CST" },
  { id: 2, name: "Civil Technology", shortName: "CT" },
  { id: 3, name: "Electrical Technology", shortName: "ET" },
  { id: 4, name: "Mechanical Technology", shortName: "MT" },
  { id: 5, name: "Electronics Technology", shortName: "ENT" },
  { id: 6, name: "Electro-medical Technology", shortName: "EMT" },
  { id: 7, name: "Refrigeration & Air Conditioning Technology", shortName: "RAC" },
];

const AddDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search 
  const filteredData = useMemo(() => {
    return DEPARTMENT_DATA.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#001f3f]">Add Department</h2>
        
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search Department..."
              className="pl-10 border-slate-200 focus-visible:ring-[#003f5c]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <Button className="bg-[#003f5c] hover:bg-[#002d42] text-white flex items-center gap-2 px-6">
            Add Department <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#e9eff3] font-semibold text-lg">
            <TableRow >
              <TableHead className="font-bold text-slate-700 py-4">Name</TableHead>
              <TableHead className="font-bold text-slate-700">Short Name</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 border-b">
                  <TableCell className="text-slate-600 font-medium py-4">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {row.shortName}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-2">
                      <FileEdit className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-slate-500">
                  No departments found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddDepartment;