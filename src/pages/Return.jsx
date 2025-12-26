import React, { useState, useMemo } from 'react';
import { Search, Plus, FileEdit, Trash2, ChevronLeft, ChevronRight, SlidersHorizontal, Check } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoaderData } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Return = () => {
    const returnData = useLoaderData();
  const [data, setData] = useState(returnData);
  const [searchTerm, setSearchTerm] = useState("");
  
 // Modal add, edit, delete return
  const [isModalOpenAddReturn, setIsModalOpenAddReturn] = useState(false);
  const [isModalOpenEditReturn, setIsModalOpenEditReturn] = useState(false);
  const [isModalOpenDeleteIssueReturn, setIsModalOpenDeleteIssueReturn] = useState(false);


  // Filtering 
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Enhanced Filtering 
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.roll.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.sCode.includes(searchTerm);
      
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  // Pagination 
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="p-6 space-y-4 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-[#001f3f] mb-4">Issue & Return</h2>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          
          
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search Student Issue Roll..." 
              className="pl-10 border-slate-200 focus-visible:ring-[#003f5c]" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <Button
          onClick={()=> setIsModalOpenAddReturn(true)}
          className="bg-[#003f5c] cursor-pointer hover:bg-[#002d42] text-white flex items-center gap-2 px-6">
          Add Return <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm space-y-4">
        <Table className={''}>
          <TableHeader className="bg-[#e9eff3] ">
            <TableRow className={'font-semibold text-lg'}>
              <TableHead className="font-bold text-slate-700 text-center py-4">Student Roll</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Subject Code</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Department</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Semester</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Return Date</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 border-b text-center">
                  <TableCell className="text-slate-600 font-medium">{row.roll}</TableCell>
                  <TableCell className="text-slate-600">{row.sCode}</TableCell>
                  <TableCell className="text-slate-600">{row.department}</TableCell>
                  <TableCell className="text-slate-600">{row.semester}</TableCell>
                  <TableCell className="text-slate-600">{row.returnDate}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={()=> setIsModalOpenEditReturn(true)}
                        className="text-slate-400 hover:text-blue-600 transition-colors">
                        <FileEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={()=> setIsModalOpenDeleteIssueReturn(true)}
                        className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                  No results found for "{statusFilter}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer Pagination */}
        <div className="flex items-center justify-end p-4 gap-2 bg-white border-t">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {[...Array(totalPages)].map((key, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              className={currentPage === i + 1 ? "bg-[#003f5c] text-white hover:bg-[#003f5c]" : "text-slate-600"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

        {/* Modal Add Return*/}
        <Dialog
          open={isModalOpenAddReturn}
          onOpenChange={setIsModalOpenAddReturn}
        >
          <DialogContent className="p-10 min-w-5xl w-full">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-[#003d4d]">
                Add Return
              </DialogTitle>
            </DialogHeader>

            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">Student Roll</Label>
                  <Input type={Number} placeholder="Enter a student roll no..." />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Subject Code</Label>
                  <Input type={Number} placeholder="Enter your book Subject code" />
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
              <div className='space-y-2'>
                <Label className="font-bold">Return Date</Label>
                  <Input type={Date} placeholder="dd/mm/yyy" />
              </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpenAddReturn(false)}
                  className="w-32 border-gray-300 text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-32 bg-[#003d4d] hover:bg-[#002a35] font-bold text-white"
                >
                  Add Issue
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal Edit Return */}
        <Dialog
          open={isModalOpenEditReturn}
          onOpenChange={setIsModalOpenEditReturn}
        >
          <DialogContent className="p-10 min-w-5xl w-full">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-[#003d4d]">
                Edit Return
              </DialogTitle>
            </DialogHeader>

            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">Student Roll</Label>
                  <Input type={Number} placeholder="Enter your roll number..." />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Subject Code</Label>
                  <Input type={Number} placeholder="Enter your book Subject code" />
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
              <div className='space-y-2'>
                <Label className="font-bold">Return Date</Label>
                  <Input type={Date} placeholder="dd/mm/yyyy" />
              </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpenEditReturn(false)}
                  className="w-32 border-gray-300 text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-32 bg-[#003d4d] hover:bg-[#002a35] font-bold text-white"
                >
                  Update Issue
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal Delete Return */}
        <Dialog open={isModalOpenDeleteIssueReturn} onOpenChange={setIsModalOpenDeleteIssueReturn}>
          <DialogContent className="text-center">
            <DialogTitle className="text-red-500">Delete Book</DialogTitle>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsModalOpenDeleteIssueReturn(false)}
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

export default Return;