import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock Data
const DATA = {
  issue: [
    { name: 'Computer', value: 145, color: '#8b5cf6' },
    { name: 'Civil', value: 203, color: '#6ee7b7' },
    { name: 'Mechanical', value: 209, color: '#4f46e5' },
    { name: 'Electromedical', value: 93, color: '#fbbf24' },
    { name: 'Electronics', value: 180, color: '#22d3ee' },
    { name: 'Electrical', value: 228, color: '#10b981' },
    { name: 'RAC', value: 139, color: '#3b82f6' },
  ],
  return: [
    { name: 'Computer', value: 120, color: '#8b5cf6' },
    { name: 'Civil', value: 150, color: '#6ee7b7' },
    { name: 'Mechanical', value: 180, color: '#4f46e5' },
    { name: 'Electromedical', value: 70, color: '#fbbf24' },
    { name: 'Electronics', value: 160, color: '#22d3ee' },
    { name: 'Electrical', value: 210, color: '#10b981' },
    { name: 'RAC', value: 110, color: '#3b82f6' },
  ]
};

const LibraryChart = () => {
  const [view, setView] = useState('issue'); // 'issue' or 'return'
  const currentData = DATA[view];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Button 
          variant={view === 'issue' ? 'default' : 'outline'}
          onClick={() => setView('issue')}
          className={view === 'issue' ? "bg-[#003f5c]" : ""}
        >
          Issue Books
        </Button>
        <Button 
          variant={view === 'return' ? 'default' : 'outline'}
          onClick={() => setView('return')}
          className={view === 'return' ? "bg-[#003f5c]" : ""}
        >
          Return Books
        </Button>
      </CardHeader>
      
      <CardContent className="flex flex-col md:flex-row items-center justify-center h-[400px]">
        {/* Donut Chart */}
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                // Custom Label rendering to match the image lines
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, color }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 0 + outerRadius + (innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
                      {`${name}`}
                      <tspan x={x} dy="1.2em" fill={color} className="font-bold">{value}</tspan>
                    </text>
                  );
                }}
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <h3 className="text-xl font-bold text-slate-800 leading-tight">Total<br/>Books</h3>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-2 ml-8">
          {currentData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LibraryChart;