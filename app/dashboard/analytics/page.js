"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function AnalyticsPage() {
  const tasks = useSelector((state) => state.task.tasks);

  // Distribution by priority
  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length, color: '#EF4444' }, // red-500
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length, color: '#F59E0B' }, // amber-500
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length, color: '#10B981' }, // emerald-500
  ].filter(d => d.value > 0);

  // Completion rate
  const completedCount = tasks.filter(t => t.status === 'Done').length;
  const totalCount = tasks.length;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const statusData = [
    { name: 'Todo', count: tasks.filter(t => t.status === 'Todo').length },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Done', count: completedCount },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Deep dive into your task statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {priorityData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[200px] relative flex items-center justify-center w-full">
               <svg className="w-40 h-40 transform -rotate-90">
                 <circle
                   cx="80"
                   cy="80"
                   r="70"
                   stroke="currentColor"
                   strokeWidth="12"
                   fill="transparent"
                   className="text-gray-200 dark:text-gray-800"
                 />
                 <circle
                   cx="80"
                   cy="80"
                   r="70"
                   stroke="currentColor"
                   strokeWidth="12"
                   fill="transparent"
                   strokeDasharray={2 * Math.PI * 70}
                   strokeDashoffset={2 * Math.PI * 70 * (1 - completionRate / 100)}
                   className="text-indigo-600 transition-all duration-1000 ease-in-out"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{completionRate}%</span>
                 <span className="text-xs text-gray-500 dark:text-gray-400">Completed</span>
               </div>
            </div>
            
            <div className="mt-8 w-full max-w-sm">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 font-medium">Progress</span>
                <span className="font-medium">{completedCount} / {totalCount} Tasks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6', opacity: 0.5}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
