"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask, deleteTask } from "@/redux/slices/taskSlice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export function TaskModal({ isOpen, onClose, taskToEdit }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
  });

  useEffect(() => {
    if (taskToEdit && taskToEdit.id) {
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "Medium",
        status: taskToEdit.status || "Todo",
        dueDate: taskToEdit.dueDate || "",
      });
    } else if (taskToEdit) {
      // It's a new task with a specific status prepopulated
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: taskToEdit.status || "Todo",
        dueDate: "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
        dueDate: "",
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (taskToEdit && taskToEdit.id) {
      dispatch(editTask({ ...taskToEdit, ...formData }));
      toast.success("Task updated");
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
      toast.success("Task added");
    }
    onClose();
  };

  const handleDelete = () => {
    if (taskToEdit && taskToEdit.id) {
      dispatch(deleteTask(taskToEdit.id));
      toast.success("Task deleted");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transform transition-all">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {taskToEdit && taskToEdit.id ? "Edit Task" : "Add Task"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add more details..."
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <option value="Todo" className="bg-white dark:bg-gray-950 text-blue-600 dark:text-blue-400 font-medium">Todo</option>
                <option value="In Progress" className="bg-white dark:bg-gray-950 text-amber-600 dark:text-amber-400 font-medium">In Progress</option>
                <option value="Done" className="bg-white dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-medium">Done</option>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <Select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="High" className="bg-white dark:bg-gray-950 text-red-600 dark:text-red-400 font-medium">High</option>
                <option value="Medium" className="bg-white dark:bg-gray-950 text-amber-600 dark:text-amber-400 font-medium">Medium</option>
                <option value="Low" className="bg-white dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-medium">Low</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 flex items-center justify-between space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {taskToEdit && taskToEdit.id ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            ) : (
              <div></div> // Empty div for spacing if no delete button
            )}
            
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white border-transparent">
                {taskToEdit && taskToEdit.id ? "Save Changes" : "Create Task"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
