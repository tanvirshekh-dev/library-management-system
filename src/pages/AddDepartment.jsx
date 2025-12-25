import React, { useState, useMemo } from "react";
import { Search, Plus, FileEdit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";

export default function AddDepartment() {
  const addDepartment = useLoaderData();
  const [query, setQuery] = useState("");

  // search name and shortName
  const filteredData = useMemo(() => {
    return addDepartment.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.shortName.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      {/* Header Section */}
      <h2 className="text-xl font-semibold pb-5">Add Department</h2>
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
          Add Department <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#e9eff3]">
            {" "}
            {/* Design-accurate header color */}
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
                <TableRow
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors border-b"
                >
                  <TableCell className="text-slate-600 font-medium py-4 px-6">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-slate-600 px-6">
                    {item.shortName}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost"  className="text-blue-600 transition-colors p-2">
                      <FileEdit className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-slate-500"
                >
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
