"use client";

import { useState } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter, setPriorityFilter } from "@/redux/slices/filterSlice";
import { Select } from "@/components/ui/Select";

export default function KanbanPage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const statusFilter = useSelector((state) => state.filter.status);
  const priorityFilter = useSelector((state) => state.filter.priority);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleAddTask = (status = "Todo") => {
    setTaskToEdit({ status });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setTaskToEdit(null), 300); // Wait for transition
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Drag and Drop</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your tasks using drag and drop.</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select 
            className="w-[140px]" 
            value={statusFilter} 
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
          >
            <option value="All" className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-medium">All Status</option>
            <option value="Todo" className="bg-white dark:bg-gray-950 text-blue-600 dark:text-blue-400 font-medium">Todo</option>
            <option value="In Progress" className="bg-white dark:bg-gray-950 text-amber-600 dark:text-amber-400 font-medium">In Progress</option>
            <option value="Done" className="bg-white dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-medium">Done</option>
          </Select>
          
          <Select 
            className="w-[140px]" 
            value={priorityFilter} 
            onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
          >
            <option value="All" className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-medium">All Priority</option>
            <option value="High" className="bg-white dark:bg-gray-950 text-red-600 dark:text-red-400 font-medium">High</option>
            <option value="Medium" className="bg-white dark:bg-gray-950 text-amber-600 dark:text-amber-400 font-medium">Medium</option>
            <option value="Low" className="bg-white dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-medium">Low</option>
          </Select>

          <Button onClick={() => handleAddTask("Todo")} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-transparent">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <KanbanBoard onEditTask={handleEditTask} onAddTask={handleAddTask} />
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        taskToEdit={taskToEdit?.id ? taskToEdit : null} 
      />
    </div>
  );
}
