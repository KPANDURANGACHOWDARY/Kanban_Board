"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import {
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { moveTask, reorderTasks } from "@/redux/slices/taskSlice";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { Button } from "./ui/Button";

function Column({ id, title, tasks, onEdit, onAddTask }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col rounded-xl bg-gray-100 dark:bg-gray-800/50 p-4 w-full min-w-[300px] border border-gray-200 dark:border-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => onAddTask(id)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div ref={setNodeRef} className="flex flex-col gap-3 flex-1 min-h-[200px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex h-full flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500">
            No tasks, drop here
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ onEditTask, onAddTask }) {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.task.tasks);
  const statusFilter = useSelector((state) => state.filter.status);
  const priorityFilter = useSelector((state) => state.filter.priority);
  const searchQuery = useSelector((state) => state.filter.searchQuery);

  const [activeTask, setActiveTask] = useState(null);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      const matchStatus = statusFilter === "All" || task.status === statusFilter;
      const matchPriority = priorityFilter === "All" || task.priority === priorityFilter;
      const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchStatus && matchPriority && matchSearch;
    });
  }, [allTasks, statusFilter, priorityFilter, searchQuery]);

  const columns = ["Todo", "In Progress", "Done"];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = allTasks.find(t => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    
    // Find containers (columns)
    const activeContainer = active.data.current?.task?.status;
    const overId = over.id;
    
    // Is over a column?
    if (columns.includes(overId)) {
      if (activeContainer !== overId) {
        dispatch(moveTask({ id: active.id, status: overId }));
      }
      return;
    }

    // Is over a task?
    const overTask = allTasks.find(t => t.id === overId);
    if (overTask && activeContainer !== overTask.status) {
      dispatch(moveTask({ id: active.id, status: overTask.status }));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTaskData = allTasks.find(t => t.id === activeId);
    const overTaskData = allTasks.find(t => t.id === overId);

    if (activeTaskData && overTaskData && activeTaskData.status === overTaskData.status) {
      // Reordering within the same column
      dispatch(reorderTasks({ activeId, overId, status: activeTaskData.status }));
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full w-full gap-6 overflow-x-auto pb-4 pt-2">
        {columns.map((colId) => (
          <Column 
            key={colId} 
            id={colId} 
            title={colId} 
            tasks={filteredTasks.filter((t) => t.status === colId)} 
            onEdit={onEditTask}
            onAddTask={(status) => onAddTask(status)}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80 rotate-3 cursor-grabbing">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
