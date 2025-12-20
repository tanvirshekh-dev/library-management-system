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

// 1. Define how many items to show per page
const ITEMS_PER_PAGE = 10;

const MOCK_DATA = [
  {
    name: "Tiana",
    roll: "28545",
    dept: "CST",
    semester: "1st",
    total: 50,
    running: 2,
    fine: "02",
    status: "Regular",
  },
  {
    name: "Paityn",
    roll: "28545",
    dept: "CST",
    semester: "2nd",
    total: 50,
    running: 5,
    fine: "05",
    status: "Irregular",
  },
  {
    name: "Gustavo",
    roll: "28545",
    dept: "ENT",
    semester: "4th",
    total: 25,
    running: 20,
    fine: "20",
    status: "Regular",
  },
  {
    name: "James",
    roll: "28545",
    dept: "CT",
    semester: "5th",
    total: 48,
    running: 8,
    fine: "08",
    status: "Pass",
  },
  {
    name: "Tatiana",
    roll: "28545",
    dept: "EMT",
    semester: "6th",
    total: 20,
    running: 1,
    fine: "01",
    status: "Irregular",
  },
  {
    name: "Tiana",
    roll: "28501",
    dept: "CST",
    semester: "1st",
    total: 50,
    running: 2,
    fine: "02",
    status: "Regular",
  },
  {
    name: "Paityn",
    roll: "28502",
    dept: "CST",
    semester: "2nd",
    total: 50,
    running: 5,
    fine: "05",
    status: "Irregular",
  },
  {
    name: "Gustavo",
    roll: "28503",
    dept: "ENT",
    semester: "4th",
    total: 25,
    running: 20,
    fine: "20",
    status: "Regular",
  },
  {
    name: "James",
    roll: "28504",
    dept: "CT",
    semester: "5th",
    total: 48,
    running: 8,
    fine: "08",
    status: "Pass",
  },
  {
    name: "Tatiana",
    roll: "28505",
    dept: "EMT",
    semester: "6th",
    total: 20,
    running: 1,
    fine: "01",
    status: "Irregular",
  },
  {
    name: "Davis",
    roll: "28506",
    dept: "RAC",
    semester: "7th",
    total: 10,
    running: 2,
    fine: "02",
    status: "Regular",
  },
  {
    name: "Kaylynn",
    roll: "28507",
    dept: "CT",
    semester: "8th",
    total: 58,
    running: 7,
    fine: "07",
    status: "Pass",
  },
  {
    name: "Talan",
    roll: "28508",
    dept: "MT",
    semester: "1st",
    total: 20,
    running: 3,
    fine: "03",
    status: "Regular",
  },
  {
    name: "Jayden",
    roll: "28509",
    dept: "CST",
    semester: "2nd",
    total: 10,
    running: 8,
    fine: "08",
    status: "Irregular",
  },
  {
    name: "Alivia",
    roll: "28510",
    dept: "ET",
    semester: "3rd",
    total: 15,
    running: 0,
    fine: "00",
    status: "Regular",
  },
  {
    name: "Skyler",
    roll: "28511",
    dept: "ENT",
    semester: "4th",
    total: 32,
    running: 4,
    fine: "04",
    status: "Pass",
  },
  {
    name: "Makenna",
    roll: "28512",
    dept: "RAC",
    semester: "5th",
    total: 12,
    running: 9,
    fine: "09",
    status: "Irregular",
  },
  {
    name: "Jaden",
    roll: "28513",
    dept: "CST",
    semester: "6th",
    total: 45,
    running: 3,
    fine: "03",
    status: "Regular",
  },
  {
    name: "Emerson",
    roll: "28514",
    dept: "MT",
    semester: "7th",
    total: 22,
    running: 5,
    fine: "05",
    status: "Pass",
  },
  {
    name: "Ariana",
    roll: "28515",
    dept: "CT",
    semester: "8th",
    total: 30,
    running: 2,
    fine: "02",
    status: "Regular",
  },
  {
    name: "Zion",
    roll: "28516",
    dept: "EMT",
    semester: "1st",
    total: 18,
    running: 1,
    fine: "01",
    status: "Irregular",
  },
  {
    name: "Kyla",
    roll: "28517",
    dept: "ET",
    semester: "2nd",
    total: 55,
    running: 10,
    fine: "10",
    status: "Regular",
  },
  {
    name: "Ryker",
    roll: "28518",
    dept: "CST",
    semester: "3rd",
    total: 40,
    running: 6,
    fine: "06",
    status: "Pass",
  },
  {
    name: "Adelyn",
    roll: "28519",
    dept: "ENT",
    semester: "4th",
    total: 28,
    running: 4,
    fine: "04",
    status: "Regular",
  },
  {
    name: "Kyree",
    roll: "28520",
    dept: "MT",
    semester: "5th",
    total: 14,
    running: 7,
    fine: "07",
    status: "Irregular",
  },
];

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
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
          <DropdownMenu>
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
          </DropdownMenu>

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

      <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-[#e9eff3]">
            <TableRow>
              <TableHead className="font-bold text-slate-700 py-4">
                Name
              </TableHead>
              <TableHead className="font-bold text-slate-700">Roll</TableHead>
              <TableHead className="font-bold text-slate-700">
                Department
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Semester
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Status
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right pr-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50 border-b">
                  <TableCell className="text-slate-600 py-4">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-600">{row.roll}</TableCell>
                  <TableCell className="text-slate-600">{row.dept}</TableCell>
                  <TableCell className="text-slate-600">
                    {row.semester}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-blue-600"
                      >
                        <FileEdit className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-slate-500"
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
