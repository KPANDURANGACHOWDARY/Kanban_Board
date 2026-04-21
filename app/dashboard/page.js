"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const tasks = useSelector((state) => state.task.tasks);

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.filter((t) => t.status === "Todo" || t.status === "In Progress").length;

  const data = [
    { name: 'Todo', count: tasks.filter(t => t.status === 'Todo').length },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Done', count: tasks.filter(t => t.status === 'Done').length },
  ];

  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening with your projects today.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All recorded tasks</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-500">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">{pendingTasks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Needs your attention</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-500">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{completedTasks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tasks marked as done</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6', opacity: 0.5}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recently Added</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.length > 0 ? (
                recentTasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-4 border-b pb-3 last:border-0 dark:border-gray-800">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">{task.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {task.status}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">No tasks found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
