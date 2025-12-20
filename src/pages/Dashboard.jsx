import { cn } from "@/lib/utils"

import { Users, BookCheck, AlertCircle, Search, Edit, Trash2, Filter, List, ChevronRight, BookCopy, BookAlert } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import DashbordBarChart from "@/components/dashboard/DashbordBarChart"
import DashboardPyChart from "@/components/dashboard/DashboardPyChart"
import OverdueBooklists from "@/components/dashboard/OverdueBooklists"



export default function Dashboard() {
  return (

    // Library dashboard
     <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-500 text-white border-0 shadow-lg p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <BookCopy className="w-9 h-9" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Total Books</p>
              <p className="text-3xl font-bold">1025</p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-500 text-white border-0 shadow-lg p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Users className="w-9 h-9" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Total Students</p>
              <p className="text-3xl font-bold">5000</p>
            </div>
          </div>
        </Card>

        <Card className="bg-yellow-500 text-white border-0 shadow-lg p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <BookAlert className="w-9 h-9" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Issued Books</p>
              <p className="text-3xl font-bold">500</p>
            </div>
          </div>
        </Card>

        <Card className="bg-red-500 text-white border-0 shadow-lg p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-9 h-9" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Overdue Books</p>
              <p className="text-3xl font-bold">400</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <DashbordBarChart></DashbordBarChart>

        {/* Pie Chart */}
        <DashboardPyChart></DashboardPyChart>
      </div>

      {/* Books Table */}
      <OverdueBooklists></OverdueBooklists>
    </div>
  );
}
