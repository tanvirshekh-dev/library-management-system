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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLoaderData } from "react-router-dom";

// 1. Define how many items to show per page
const ITEMS_PER_PAGE = 10;

export default function StudentManagement() {
  const studentList = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  // Filter Logic
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

  // 2. Pagination Calculations
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const getStatusBadge = (status) => {
    const styles = {
      Regular: "bg-blue-100 text-blue-600 hover:bg-blue-100",
      Pass: "bg-green-100 text-green-600 hover:bg-green-100",
      Irregular: "bg-red-100 text-red-600 hover:bg-red-100",
    };
    return (
      <Badge className={`rounded-full px-4 font-normal ${styles[status]}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-[#001f3f]">Student Management</h2>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full max-w-2xl">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 text-slate-500 border-slate-200 px-6"
              >
                Filter <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["All", "Regular", "Irregular", "Pass"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }} // Reset to page 1 on filter
                  className="flex justify-between items-center cursor-pointer"
                >
                  {status}
                  {statusFilter === status && (
                    <Check className="h-4 w-4 text-[#003f5c]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search student name or roll..."
              className="pl-10 border-slate-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }} // Reset to page 1 on search
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm bg-white text-center">
        <Table>
          <TableHeader className="bg-[#e9eff3]">
            <TableRow>
              <TableHead className="font-bold text-slate-700 py-3 text-center">
                Name
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Roll</TableHead>
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
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50 border-b text-center">
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
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <FileEdit className="h-5 w-5" />
                      </button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">
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

        {/* 3. Bottom Right Pagination */}
        <div className="flex items-center justify-end px-6 py-4 border-t gap-2">
          {/* Previous Button */}
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
      </div>
    </div>
  );
}
