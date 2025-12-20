import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  FileEdit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Demo Data
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "Physics -II",
    sCode: "28545",
    copies: 100,
    author: "Ruben",
    dept: "CST",
    semester: "7th",
  },
  {
    id: 2,
    title: "Python Programming",
    sCode: "28545",
    copies: 150,
    author: "Justin",
    dept: "CST",
    semester: "6th",
  },
  {
    id: 3,
    title: "Graphics Design-I",
    sCode: "28545",
    copies: 48,
    author: "Maren",
    dept: "ET",
    semester: "5th",
  },
  {
    id: 4,
    title: "Mathematics-III",
    sCode: "28545",
    copies: 264,
    author: "Madelyn",
    dept: "ENT",
    semester: "3rd",
  },
  {
    id: 5,
    title: "IT Support Services",
    sCode: "28545",
    copies: 78,
    author: "Roger",
    dept: "RAC",
    semester: "4th",
  },
  {
    id: 6,
    title: "Chemistry",
    sCode: "66548",
    copies: 185,
    author: "J. Doe",
    dept: "EEE",
    semester: "6th",
  },
  {
    id: 7,
    title: "Physics -III",
    sCode: "75970",
    copies: 189,
    author: "Ruben",
    dept: "BBA",
    semester: "8th",
  },
  {
    id: 8,
    title: "Data Structures",
    sCode: "70581",
    copies: 124,
    author: "David Lee",
    dept: "BBA",
    semester: "10th",
  },
  {
    id: 9,
    title: "Digital Electronics -I",
    sCode: "78694",
    copies: 116,
    author: "Sarah Wilson",
    dept: "Law",
    semester: "3rd",
  },
  {
    id: 10,
    title: "Structural Analysis for Engineers",
    sCode: "77757",
    copies: 145,
    author: "J. Doe",
    dept: "EEE",
    semester: "1st",
  },
  {
    id: 11,
    title: "Accounting -III",
    sCode: "17731",
    copies: 188,
    author: "Michael Chen",
    dept: "English",
    semester: "9th",
  },
  {
    id: 12,
    title: "Circuit Theory for Engineers",
    sCode: "18875",
    copies: 174,
    author: "Sarah Wilson",
    dept: "EEE",
    semester: "1st",
  },
  {
    id: 13,
    title: "Digital Electronics",
    sCode: "81562",
    copies: 87,
    author: "Sarah Wilson",
    dept: "CST",
    semester: "5th",
  },
  {
    id: 14,
    title: "Mathematics for Engineers",
    sCode: "97788",
    copies: 129,
    author: "Emily Brown",
    dept: "BBA",
    semester: "12th",
  },
  {
    id: 15,
    title: "Chemistry for Engineers",
    sCode: "83538",
    copies: 113,
    author: "Laura Martinez",
    dept: "BBA",
    semester: "11th",
  },
  {
    id: 16,
    title: "Structural Analysis -I",
    sCode: "84567",
    copies: 162,
    author: "David Lee",
    dept: "Law",
    semester: "12th",
  },
  {
    id: 17,
    title: "Mathematics -I",
    sCode: "18225",
    copies: 93,
    author: "Olivia White",
    dept: "English",
    semester: "3rd",
  },
  {
    id: 18,
    title: "Constitutional Law -IV",
    sCode: "84132",
    copies: 105,
    author: "A. Khan",
    dept: "ME",
    semester: "10th",
  },
  {
    id: 19,
    title: "Grammar -I",
    sCode: "17459",
    copies: 187,
    author: "Ruben",
    dept: "BBA",
    semester: "9th",
  },
  {
    id: 20,
    title: "Accounting",
    sCode: "72046",
    copies: 88,
    author: "James Taylor",
    dept: "Law",
    semester: "8th",
  },
];

const BookManagement = () => {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // search
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  // Pagination 
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
          <h2 className="font-semibold text-xl">Book Management</h2>
      {/* Header Actions */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 " />
          <Input
            placeholder="Search Books..."
            className="px-10 py-5 bg-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
        <Button className="bg-[#003f5c] hover:bg-[#002d42] text-white py-5">
          Add Book <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Table Container */}
      <div className="border rounded-lg bg-white overflow-hidden shadow-sm space-y-4">
        <Table>
          <TableHeader className="bg-[#e2e8f0]">
            <TableRow className={'text-lg'}>
              <TableHead className="font-bold text-slate-700 py-3">
                Book Title
              </TableHead>
              <TableHead className="font-bold text-slate-700">S-Code</TableHead>
              <TableHead className="font-bold text-slate-700">Copies</TableHead>
              <TableHead className="font-bold text-slate-700">Author</TableHead>
              <TableHead className="font-bold text-slate-700">
                Department
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Semester
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book.id} className="hover:bg-slate-50">
                <TableCell className="text-slate-600">{book.title}</TableCell>
                <TableCell className="text-slate-600">{book.sCode}</TableCell>
                <TableCell className="text-slate-600">{book.copies}</TableCell>
                <TableCell className="text-slate-600">{book.author}</TableCell>
                <TableCell className="text-slate-600">{book.dept}</TableCell>
                <TableCell className="text-slate-600">
                  {book.semester}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 border border-slate-200"
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 border border-red-100 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="flex items-center justify-end p-4 border-t gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              className={currentPage === i + 1 ? "bg-[#003f5c]" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
