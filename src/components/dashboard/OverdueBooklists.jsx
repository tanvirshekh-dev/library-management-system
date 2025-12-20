import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge, ChevronRight, Edit, Filter, List, Search, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const overdueBooks = [
  {
    roll: "651221",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "Overdue",
    fine: 40,
    status: "Issued",
  },
  {
    roll: "651280",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "5 days",
    fine: 50,
    status: "Overdue",
  },
  {
    roll: "651212",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 30,
    status: "Return",
  },
  {
    roll: "651275",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 20,
    status: "Issued",
  },
  {
    roll: "651217",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 100,
    status: "Issued",
  },
  {
    roll: "651291",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 95,
    status: "Issued",
  },
  {
    roll: "651293",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 65,
    status: "Return",
  },
  {
    roll: "651284",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 25,
    status: "Overdue",
  },
  {
    roll: "651284",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 25,
    status: "Return",
  },
  {
    roll: "651310",
    code: "28545",
    issueDate: "19 May 25",
    returnDate: "19 May 25",
    issued: "7 days",
    fine: 45,
    status: "Overdue",
  },
]

const OverdueBooklists = () => {
    return (
        <div>
            <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900">Overdue Book List</h3>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <List className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Input"
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Student Roll</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">B-Code</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Issue Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Return Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Issued</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Fine</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {overdueBooks.map((book, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{book.roll}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{book.code}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{book.issueDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{book.returnDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{book.issued}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{book.fine}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                    //   variant="outline"
                      className={cn(
                        "border-0 text-base px-5 py-1 rounded-2xl",
                        book.status === "Issued" && "bg-blue-100 text-blue-700",
                        book.status === "Overdue" && "bg-red-100 text-red-700",
                        book.status === "Return" && "bg-green-100 text-green-700",
                      )}
                    >
                      {book.status}
                          </button>
                          {/* {book.status} */}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                        <Edit className="w-3.5 h-3.5 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
        </div>
    );
};

export default OverdueBooklists;