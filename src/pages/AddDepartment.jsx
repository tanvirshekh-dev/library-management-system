import React, { useState, useMemo } from "react";
import { Search, Plus, FileEdit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoaderData } from "react-router-dom";

export default function AddDepartment() {
  const addDepartment = useLoaderData();
  const [query, setQuery] = useState("");

  // Modal
  const [isAddDepartmentModalAdded, setIsAddDepartmentModalAdded] = useState(false);
  const [isAddDepartmentModalEdit, setIsAddDepartmentModalEdit] = useState(false);

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
        <Button
          onClick={()=> setIsAddDepartmentModalAdded(true)}
          className="bg-[#003f5c] hover:bg-[#002d42] text-white cursor-pointer gap-2 px-6">
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
                    <Button
                      onClick={()=> setIsAddDepartmentModalEdit(true)}
                      variant="ghost" className="text-blue-600 transition-colors p-2">
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

      {/* Modal add department */}
      <Dialog open={isAddDepartmentModalAdded} onOpenChange={setIsAddDepartmentModalAdded}>
        <DialogContent className="p-10 min-w-5xl w-full">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#003d4d]">
              Add Department
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label className="font-bold">Name</Label>
                <Input type={Text} placeholder="Enter Name" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Short Name</Label>
                <Input type={Text} placeholder="Enter Short Name" />
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDepartmentModalAdded(false)}
                className="w-32 border-gray-300 text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-32 bg-[#003d4d] hover:bg-[#002a35] font-bold text-white"
              >
                Add Department
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal edit department */}
      <Dialog open={isAddDepartmentModalEdit} onOpenChange={setIsAddDepartmentModalEdit}>
        <DialogContent className="p-10 min-w-5xl w-full">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#003d4d]">
              Add Department
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label className="font-bold">Name</Label>
                <Input type={Text} placeholder="Enter Department Name" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Short Name</Label>
                <Input type={Text} placeholder="Enter Department Short Name" />
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDepartmentModalEdit(false)}
                className="w-32 border-gray-300 text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-32 bg-[#003d4d] hover:bg-[#002a35] font-bold text-white"
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
