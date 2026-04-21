import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    initializeTasks: (state) => {
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        state.tasks = storedTasks;
      }
    },
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    moveTask: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.status = status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    reorderTasks: (state, action) => {
      // payload: { activeId, overId, status }
      // This is for drag and drop reordering inside the same column (optional, but good UX)
      // Since dnd-kit gives us active and over, we can just do array moves.
      // If we just swap statuses we use moveTask.
      const { activeId, overId, status } = action.payload;
      // Simple implementation: just move to the end of the new status if crossing columns.
      // If same column, we can do array move.
      const activeIndex = state.tasks.findIndex(t => t.id === activeId);
      const overIndex = state.tasks.findIndex(t => t.id === overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const [movedTask] = state.tasks.splice(activeIndex, 1);
        movedTask.status = status;
        state.tasks.splice(overIndex, 0, movedTask);
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    }
  },
});

export const { initializeTasks, addTask, editTask, deleteTask, moveTask, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
