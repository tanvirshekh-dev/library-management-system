import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  FileEdit,
  Trash2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useLoaderData } from "react-router-dom";

// items show per page
const ITEMS_PER_PAGE = 10;

export default function StudentManagement() {
  const studentList = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal edit, delete student info
  const [editStudentInfo, setEditStudentInfo] = useState(false);
  const [deleteStudentInfo, setDeleteStudentInfo] = useState(false);

  // Filter 
  const filteredData = useMemo(() => {
    return studentList.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.roll.includes(searchTerm);
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Pagination 
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-[#001f3f]">Student Management</h2>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search student name or roll..."
              className="pl-10 border-slate-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }} 
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm bg-white text-center">
        <Table>
          <TableHeader className="bg-[#e9eff3] text-lg">
            <TableRow>
              <TableHead className="font-bold text-slate-700 py-5 text-center">
                Name
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Roll
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Department
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Semester
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Total Issue
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center pr-8">
                Return Issue
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center pr-8">
                Running Issue
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center pr-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"text-base"}>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-slate-50 border-b text-center"
                >
                  <TableCell className="text-slate-600 py-4">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600">{row.roll}</TableCell>
                  <TableCell className="text-slate-600">{row.dept}</TableCell>
                  <TableCell className="text-slate-600">
                    {row.semester}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.totalIssue}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.returnIssue}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.runningIssue}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditStudentInfo(true)}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <FileEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={()=> setDeleteStudentInfo(true)}
                        className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 mx-auto text-center text-slate-500"
                >
                  No {statusFilter !== "All" ? statusFilter.toLowerCase() : ""}{" "}
                  students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Bottom Pagination */}
        <div className="flex items-center justify-end px-6 py-4 border-t gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-[#003f5c]"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Page Number Buttons */}
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  className={`h-9 w-9 p-0 font-medium ${
                    currentPage === pageNumber
                      ? "bg-[#003f5c] text-white hover:bg-[#002d42]"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-[#003f5c]"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Modal student info edit */}
        <Dialog open={editStudentInfo} onOpenChange={setEditStudentInfo}>
          <DialogContent className="p-10 min-w-5xl w-full">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-[#003d4d]">
                Edit Student Info
              </DialogTitle>
            </DialogHeader>

            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">Name</Label>
                  <Input type={Text} placeholder="Enter Student Name" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Roll</Label>
                  <Input
                    type={Number}
                    placeholder="Enter Student Roll Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Department</Label>
                  <Select>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="rs">Rac</SelectItem>
                      <SelectItem value="ee">EEE</SelectItem>
                      <SelectItem value="cv">Civil</SelectItem>
                      <SelectItem value="el">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Semester</Label>
                  <Select>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                      <SelectItem value="3">Semester 3</SelectItem>
                      <SelectItem value="4">Semester 4</SelectItem>
                      <SelectItem value="5">Semester 5</SelectItem>
                      <SelectItem value="6">Semester 6</SelectItem>
                      <SelectItem value="7">Semester 7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Total Issue</Label>
                  <Input type={Number} placeholder="000" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Return Issue</Label>
                  <Input type={Number} placeholder="000" />
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditStudentInfo(false)}
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

        {/* Modal Delete Student */}
        <Dialog open={deleteStudentInfo} onOpenChange={setDeleteStudentInfo}>
          <DialogContent className="text-center">
            <DialogTitle className="text-red-500">Delete Book</DialogTitle>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setDeleteStudentInfo(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-red-500"
                onClick={() => {
                  console.log("Book Deleted");
                  setOpenDelete(false);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
