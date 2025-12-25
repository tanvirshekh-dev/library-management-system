import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const BookList = () => {
  // This state should ideally be managed by your Layout/Sidebar 
  // or checked via window.location.pathname
  const [activeTab, setActiveTab] = useState("add-book"); 
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Safely handle data from the loader
  const books = useLoaderData() || [];

  // 1. Filter Logic
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.code.includes(searchTerm)
    );
  }, [searchTerm, books]);

  // 2. Pagination Calculation
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredBooks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredBooks]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Rendering logic for the data table
  const renderTableContent = () => {
    if (currentTableData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center text-gray-500">
            No books found.
          </TableCell>
        </TableRow>
      );
    }

    return currentTableData.map((book, index) => (
      <TableRow key={index} className="hover:bg-gray-50/50">
        <TableCell className="font-medium text-gray-800">{book.title}</TableCell>
        <TableCell className="text-gray-600">{book.code}</TableCell>
        <TableCell className="text-gray-600">{book.copies}</TableCell>
        <TableCell className="text-gray-600">{book.dept}</TableCell>
        <TableCell className="text-gray-600">{book.semester}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-3">
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <Edit className="h-5 w-5" />
            </button>
            <button className="text-red-400 hover:text-red-600 transition-colors">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Dynamic Heading based on sidebar selection */}
      <h2 className="text-xl font-bold text-[#003d4d] mb-6">
        {activeTab === "add-book" ? "Book Management" : "Book Settings"}
      </h2>

      {/* Main Container: Only renders table if 'add-book' is active */}
      {activeTab === "add-book" ? (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Books..."
                className="pl-10 bg-white border-gray-200"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button className="bg-[#003d4d] hover:bg-[#002a35] text-white flex gap-2 px-6">
              Add Book <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">Book Title</TableHead>
                  <TableHead className="font-bold text-gray-700">S-Code</TableHead>
                  <TableHead className="font-bold text-gray-700">Copies</TableHead>
                  <TableHead className="font-bold text-gray-700">Department</TableHead>
                  <TableHead className="font-bold text-gray-700">Semester</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableContent()}
              </TableBody>
            </Table>

            {/* Pagination UI */}
            <div className="flex items-center justify-end px-4 py-4 border-t gap-2 bg-white">
              <p className="text-sm text-gray-400 mr-4">
                Showing {currentTableData.length} of {filteredBooks.length} results
              </p>
              
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-8 w-8 p-0 text-xs font-semibold ${
                    currentPage === i + 1
                      ? "bg-[#003d4d] text-white hover:bg-[#002a35]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  variant="ghost"
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400 italic">Select "Add Book" from the sidebar to manage data.</p>
        </div>
      )}
    </div>
  );
};

export default BookList;