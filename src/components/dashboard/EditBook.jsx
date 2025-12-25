import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
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
import { useLoaderData, useNavigate } from "react-router-dom";

const EditBook = () => {
  const navigate = useNavigate();
  const books = useLoaderData() || [];
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  // Table Logic
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.code.includes(searchTerm)
    );
  }, [searchTerm, books]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const currentTableData = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-[#003d4d] mb-6">Book Management</h2>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Books..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="font-bold text-center">
                Book Title
              </TableHead>
              <TableHead className="font-bold text-center">S-Code</TableHead>
              <TableHead className="font-bold text-center">Copies</TableHead>
              <TableHead className="font-bold text-center">
                Department
              </TableHead>
              <TableHead className="font-bold text-center">Semester</TableHead>
              <TableHead className="font-bold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"text-center"}>
            {currentTableData.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.code}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>{book.dept}</TableCell>
                <TableCell>{book.semester}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-3">
                    <Edit
                      onClick={() => setIsModalOpenEdit(true)}
                      className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer"
                    />

                            <Trash2
                            onClick={()=> setIsModalOpenDelete(true)}
                                className="h-5 w-5 text-red-400 hover:text-red-600 cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/*  MODAL  */}
      <Dialog open={isModalOpenEdit} onOpenChange={setIsModalOpenEdit}>
        <DialogContent className="p-10 min-w-5xl w-full">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#003d4d]">
              Edit Book
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label className="font-bold">Book Title</Label>
                <Input placeholder="Enter your book title" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">S-Code</Label>
                <Input placeholder="Enter your book Subject code" />
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
                <Label className="font-bold">Copies</Label>
                <Input placeholder="Enter your book copies" />
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="w-32 border-gray-300 text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-32 bg-[#003d4d] hover:bg-[#002a35] font-bold text-white"
              >
                Edit Book
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal */}
      <Dialog open={isModalOpenDelete} onOpenChange={setIsModalOpenDelete}>
        <DialogContent className="text-center">
          <DialogTitle className="text-red-500">Delete Book</DialogTitle>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsModalOpenDelete(false)}
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
  );
};

export default EditBook;
