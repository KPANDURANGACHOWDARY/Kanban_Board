"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/slices/taskSlice";
import { GripVertical, MoreVertical, Edit2, Trash2, Clock } from "lucide-react";
import { useState } from "react";

export function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    Low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950 ${
        isDragging ? "ring-2 ring-indigo-500 z-10" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 max-w-[85%]">
          <div
            {...attributes}
            {...listeners}
            className="mt-0.5 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing dark:text-gray-600 dark:hover:text-gray-400"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {task.title}
            </h4>
            {task.description && (
              <p className="mt-1 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showOptions && (
            <div 
              className="absolute right-0 top-full z-20 mt-1 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <button
                className="flex w-full items-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => {
                  onEdit(task);
                  setShowOptions(false);
                }}
              >
                <Edit2 className="mr-2 h-3 w-3" /> Edit
              </button>
              <button
                className="flex w-full items-center px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => {
                  handleDelete();
                  setShowOptions(false);
                }}
              >
                <Trash2 className="mr-2 h-3 w-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-medium ${
              priorityColors[task.priority || "Medium"]
            }`}
          >
            {task.priority || "Medium"}
          </span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-[10px] text-gray-500 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-sm">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Invisible overlay for capturing outside clicks on the menu */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(false);
          }} 
        />
      )}
    </div>
  );
}
