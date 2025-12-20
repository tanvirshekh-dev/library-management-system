import React, { useState, useMemo } from 'react'; // Added missing hooks
import { Search, Plus, FileEdit } from 'lucide-react'; // Added missing icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Ensure these paths are correct
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Demo data
const SEMESTER_DATA = [
  { id: 1, name: "First Semester", shortName: "1st" },
  { id: 2, name: "Second Semester", shortName: "2nd" },
  { id: 3, name: "Third Semester", shortName: "3rd" },
  { id: 4, name: "Fourth Semester", shortName: "4th" },
  { id: 5, name: "Fifth Semester", shortName: "5th" },
  { id: 6, name: "Sixth Semester", shortName: "6th" },
  { id: 7, name: "Seventh Semester", shortName: "7th" },
  { id: 8, name: "Eighth Semester", shortName: "8th" },
];

export function AddSemester() {
  const [query, setQuery] = useState("");

  // Enhanced filter to search both name and shortName
  const filteredData = useMemo(() => {
    return SEMESTER_DATA.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.shortName.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Semester..."
            className="pl-10 border-slate-200 focus:ring-[#003f5c]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button className="bg-[#003f5c] hover:bg-[#002d42] text-white gap-2 px-6">
          Add Semester <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#e9eff3]"> {/* Design-accurate header color */}
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-slate-700 py-4 px-6">
                Name
              </TableHead>
              <TableHead className="font-bold text-slate-700 px-6">
                Short Name
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right pr-10">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-b">
                  <TableCell className="text-slate-600 font-medium py-4 px-6">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-slate-600 px-6">
                    {item.shortName}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-2">
                      <FileEdit className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-slate-500">
                  No semesters found for "{query}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}