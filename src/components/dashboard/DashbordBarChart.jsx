import React from 'react';

import { useSearchParams } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Demo Data test purpose
const dataWeekly = [
  { name: 'Sun', issue: 42, return: 62 },
  { name: 'Mon', issue: 27, return: 55 },
  { name: 'Tue', issue: 65, return: 86 },
  { name: 'Wed', issue: 95, return: 21 },
  { name: 'Thu', issue: 27, return: 47 },
];

const dataMonthly = [
  { name: 'Week 1', issue: 240, return: 310 },
  { name: 'Week 2', issue: 190, return: 420 },
  { name: 'Week 3', issue: 340, return: 210 },
  { name: 'Week 4', issue: 280, return: 390 },
];

const DashbordBarChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get('view') || 'week';

  const chartData = currentView == 'month' ? dataMonthly : dataWeekly;

  return (
    <Card className="w-full max-w-3xl border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="flex bg-slate-100 p-1 rounded-md">
          <Button
            variant={currentView === 'week' ? "default" : "ghost"}
            size="sm"
            className={currentView === 'week' ? "bg-[#004d61] hover:bg-[#003a49]" : "text-slate-500"}
            onClick={() => setSearchParams({ view: 'week' })}
          >
            Week
          </Button>
          <Button
            variant={currentView === 'month' ? "default" : "ghost"}
            size="sm"
            className={currentView === 'month' ? "bg-[#004d61] hover:bg-[#003a49]" : "text-slate-500"}
            onClick={() => setSearchParams({ view: 'month' })}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={true} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                align="center" 
                iconType="rect"
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="issue" 
                name="Issue" 
                fill="#33667a" 
                radius={[2, 2, 0, 0]} 
                barSize={35}
                label={{ position: 'top', fill: '#64748b', fontSize: 11 }}
              />
              <Bar 
                dataKey="return" 
                name="Return" 
                fill="#637eff" 
                radius={[2, 2, 0, 0]} 
                barSize={35}
                label={{ position: 'top', fill: '#64748b', fontSize: 11 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashbordBarChart;