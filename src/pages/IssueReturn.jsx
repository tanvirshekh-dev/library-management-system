import React, { useState, useMemo } from 'react';
import { Search, Plus, FileEdit, Trash2, ChevronLeft, ChevronRight, SlidersHorizontal, Check } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ISSUE_DATA = [
  { id: 1, roll: "651221", sCode: "28545", issueDate: "19 May 25", returnDate: "19 May 25", overdue: "1 Day", fine: 40, status: "Issued" },
  { id: 2, roll: "651280", sCode: "28545", issueDate: "19 May 25", returnDate: "19 May 25", overdue: "6 Days", fine: 50, status: "Overdue" },
  { id: 3, roll: "651212", sCode: "28545", issueDate: "19 May 25", returnDate: "19 May 25", overdue: "7 Days", fine: 30, status: "Return" },
  { id: 4, roll: "651275", sCode: "28545", issueDate: "19 May 25", returnDate: "19 May 25", overdue: "7 Days", fine: 20, status: "Issued" },
    { id: 5, roll: "651302", sCode: "28545", issueDate: "20 May 25", returnDate: "20 May 25", overdue: "0 Day", fine: 0, status: "Return" },
  { id: 6, roll: "651310", sCode: "21055", issueDate: "10 May 25", returnDate: "17 May 25", overdue: "2 Days", fine: 10, status: "Overdue" },
  { id: 7, roll: "651420", sCode: "28545", issueDate: "21 May 25", returnDate: "28 May 25", overdue: "0 Day", fine: 0, status: "Issued" },
  { id: 8, roll: "651105", sCode: "22011", issueDate: "22 May 25", returnDate: "29 May 25", overdue: "0 Day", fine: 0, status: "Return" },
  { id: 9, roll: "651099", sCode: "28545", issueDate: "05 May 25", returnDate: "12 May 25", overdue: "15 Days", fine: 150, status: "Overdue" },
  { id: 10, roll: "651550", sCode: "23044", issueDate: "23 May 25", returnDate: "30 May 25", overdue: "0 Day", fine: 0, status: "Issued" },
  { id: 11, roll: "651612", sCode: "28545", issueDate: "12 May 25", returnDate: "19 May 25", overdue: "0 Day", fine: 0, status: "Return" },
  { id: 12, roll: "651123", sCode: "24088", issueDate: "14 May 25", returnDate: "21 May 25", overdue: "4 Days", fine: 40, status: "Overdue" },
  { id: 13, roll: "651777", sCode: "28545", issueDate: "24 May 25", returnDate: "31 May 25", overdue: "0 Day", fine: 0, status: "Issued" },
  { id: 14, roll: "651888", sCode: "25066", issueDate: "25 May 25", returnDate: "01 Jun 25", overdue: "0 Day", fine: 0, status: "Return" },
  { id: 15, roll: "651999", sCode: "28545", issueDate: "01 May 25", returnDate: "08 May 25", overdue: "20 Days", fine: 200, status: "Overdue" },
  { id: 16, roll: "652001", sCode: "26077", issueDate: "26 May 25", returnDate: "02 Jun 25", overdue: "0 Day", fine: 0, status: "Issued" },
  { id: 17, roll: "652005", sCode: "28545", issueDate: "27 May 25", returnDate: "03 Jun 25", overdue: "0 Day", fine: 0, status: "Return" },
  { id: 18, roll: "652110", sCode: "27099", issueDate: "15 May 25", returnDate: "22 May 25", overdue: "5 Days", fine: 50, status: "Overdue" },
  { id: 19, roll: "652220", sCode: "28545", issueDate: "28 May 25", returnDate: "04 Jun 25", overdue: "0 Day", fine: 0, status: "Issued" },
  { id: 20, roll: "652330", sCode: "28022", issueDate: "29 May 25", returnDate: "05 Jun 25", overdue: "0 Day", fine: 0, status: "Return" },
];

const IssueReturn = () => {
  const [data, setData] = useState(ISSUE_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State Filtering 
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

  const getStatusBadge = (status) => {
    const styles = {
      Issued: "bg-blue-50 text-blue-500 border-blue-100",
      Overdue: "bg-red-50 text-red-500 border-red-100",
      Return: "bg-green-50 text-green-500 border-green-100"
    };
    return <Badge variant="outline" className={`${styles[status]} px-3 py-0.5 rounded-full font-normal`}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-4 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-[#001f3f] mb-4">Issue & Return</h2>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-slate-600 border-slate-200">
                <SlidersHorizontal className="h-4 w-4" />
                Filter: <span className="text-[#003f5c] font-semibold">{statusFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => { setStatusFilter("All"); setCurrentPage(1); }}>
                All Books {statusFilter === "All" && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setStatusFilter("Issued"); setCurrentPage(1); }}>
                Issue Books {statusFilter === "Issued" && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setStatusFilter("Return"); setCurrentPage(1); }}>
                Return Books {statusFilter === "Return" && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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

        <Button className="bg-[#003f5c] hover:bg-[#002d42] text-white flex items-center gap-2 px-6">
          Add Issue <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm space-y-4">
        <Table className={''}>
          <TableHeader className="bg-[#e9eff3] ">
            <TableRow className={'font-semibold text-lg'}>
              <TableHead className="font-bold text-slate-700 py-4">Student Roll</TableHead>
              <TableHead className="font-bold text-slate-700">S-Code</TableHead>
              <TableHead className="font-bold text-slate-700">Issue Date</TableHead>
              <TableHead className="font-bold text-slate-700">Return Date</TableHead>
              <TableHead className="font-bold text-slate-700">Overdue</TableHead>
              <TableHead className="font-bold text-slate-700">Fine</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50 border-b">
                  <TableCell className="text-slate-600 font-medium">{row.roll}</TableCell>
                  <TableCell className="text-slate-600">{row.sCode}</TableCell>
                  <TableCell className="text-slate-600">{row.issueDate}</TableCell>
                  <TableCell className="text-slate-600">{row.returnDate}</TableCell>
                  <TableCell className="text-slate-600">{row.overdue}</TableCell>
                  <TableCell className="text-slate-600">{row.fine}</TableCell>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                  <TableCell>
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

          {[...Array(totalPages)].map((_, i) => (
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
    </div>
  );
};

export default IssueReturn;